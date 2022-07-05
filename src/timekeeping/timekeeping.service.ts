import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { SchedulerRegistry } from '@nestjs/schedule/dist/scheduler.registry';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { PrismaService } from 'src/prisma/prisma.service';
import { TimekeepingDto } from './dto';

@Injectable()
export class TimekeepingService {
  constructor(
    private prisma: PrismaService,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    dayjs.extend(utc);
  }

  async getTimekeeping(
    employeeId: number,
    year: number,
    month: number,
    day: number,
  ) {
    let timekeeping = await this.prisma.timekeeping.findFirst({
      where: {
        employee_id: employeeId,
        date: {
          gte: dayjs
            .utc()
            .year(year)
            // month from 0 - 11
            .month(month - 1)
            .date(day)
            .startOf('date')
            .toISOString(),
          lte: dayjs
            .utc()
            .year(year)
            .month(month - 1)
            .date(day)
            .endOf('date')
            .toISOString(),
        },
      },
      select: {
        date: true,
        morning_shift_start: true,
        morning_shift_end: true,
        afternoon_shift_start: true,
        afternoon_shift_end: true,
      },
    });
    if (!timekeeping) {
      timekeeping = await this.createTimekeeping(employeeId);
    }
    return timekeeping;
  }

  async getTimekeepingByMonth(employeeId: number, year: number, month: number) {
    const timekeepingsList = await this.prisma.timekeeping.findMany({
      where: {
        employee_id: employeeId,
        date: {
          gte: dayjs
            .utc()
            .year(year)
            .month(month - 1)
            .startOf('month')
            .toISOString(),
          lte: dayjs
            .utc()
            .year(year)
            .month(month - 1)
            .endOf('month')
            .toISOString(),
        },
      },
      select: {
        date: true,
        morning_shift_start: true,
        morning_shift_end: true,
        afternoon_shift_start: true,
        afternoon_shift_end: true,
      },
    });
    if (!timekeepingsList) {
      throw new ForbiddenException('no-timekeeping-found');
    }
    return timekeepingsList;
  }

  async qrCheck(employeeId: number, dto: TimekeepingDto) {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      select: {
        schedule_id: true,
      },
    });
    const schedule = await this.prisma.schedule.findUnique({
      where: {
        id: employee.schedule_id,
      },
    });

    const nowDayjsUtc = dayjs().utc().date(dayjs().date());

    const timekeeping = await this.prisma.timekeeping.findFirst({
      where: {
        employee_id: employeeId,
        date: {
          gte: nowDayjsUtc.startOf('date').toISOString(),
          lte: nowDayjsUtc.endOf('date').toISOString(),
        },
      },
    });
    if (!timekeeping) {
      throw new ForbiddenException('no-timekeeping-found');
    }
    console.log(timekeeping);
    const qrCodeInDb = await this.prisma.qrCode.findFirst();
    const isQrCodeLegit = dto.qr_code_value === qrCodeInDb.id;
    if (isQrCodeLegit === false) {
      throw new ForbiddenException('qrcode-not-matched');
    }
    const morningShiftStartSchedule = dayjs(schedule.morning_shift_start)
      .year(nowDayjsUtc.year())
      .month(nowDayjsUtc.month())
      .date(nowDayjsUtc.date());
    const morningShiftEndSchedule = dayjs(schedule.morning_shift_end)
      .year(nowDayjsUtc.year())
      .month(nowDayjsUtc.month())
      .date(nowDayjsUtc.date());
    const afternoonShiftStartSchedule = dayjs(schedule.afternoon_shift_start)
      .year(nowDayjsUtc.year())
      .month(nowDayjsUtc.month())
      .date(nowDayjsUtc.date());
    const afternoonShiftEndSchedule = dayjs(schedule.afternoon_shift_end)
      .year(nowDayjsUtc.year())
      .month(nowDayjsUtc.month())
      .date(nowDayjsUtc.date());
    // user can check in start max 2 hours late;
    // others max 30 minutes late;
    // last check out = check in start late time + schedule time + 30 minutes;
    if (
      !timekeeping.morning_shift_start &&
      nowDayjsUtc.isBefore(morningShiftStartSchedule.add(2, 'hours'))
    ) {
      await this.prisma.timekeeping.update({
        where: {
          id: timekeeping.id,
        },
        data: {
          morning_shift_start: new Date(),
        },
      });
      return;
    }
    if (
      !schedule.morning_shift_end &&
      nowDayjsUtc.isBefore(morningShiftEndSchedule.add(30, 'minutes'))
    ) {
      await this.prisma.timekeeping.update({
        where: {
          id: timekeeping.id,
        },
        data: {
          morning_shift_end: new Date(),
        },
      });
      return;
    }
    if (
      !schedule.afternoon_shift_start &&
      nowDayjsUtc.isBefore(afternoonShiftStartSchedule.add(30, 'minutes'))
    ) {
      await this.prisma.timekeeping.update({
        where: {
          id: timekeeping.id,
        },
        data: {
          afternoon_shift_start: nowDayjsUtc.toISOString(),
        },
      });
      return;
    }
    const morningShiftStartLateTime = dayjs(
      timekeeping.morning_shift_start,
    ).diff(morningShiftStartSchedule, 'minutes');
    if (
      !timekeeping.afternoon_shift_end &&
      nowDayjsUtc.isBefore(
        afternoonShiftEndSchedule
          .add(morningShiftStartLateTime, 'minutes')
          .add(30, 'minutes'),
      )
    ) {
      await this.prisma.timekeeping.update({
        where: {
          id: timekeeping.id,
        },
        data: {
          afternoon_shift_end: nowDayjsUtc.toISOString(),
        },
      });
      return;
    }
  }

  private async createTimekeeping(employeeId: number) {
    const nowDayjsUtc = dayjs().utc().date(dayjs().date()).startOf('date');
    return await this.prisma.timekeeping.create({
      data: {
        employee_id: employeeId,
        date: nowDayjsUtc.toISOString(),
      },
    });
  }
}
