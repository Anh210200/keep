import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { PrismaService } from 'src/prisma/prisma.service';
import { TimekeepingDto } from './dto';

@Injectable()
export class TimekeepingService {
  constructor(private prisma: PrismaService) {
    dayjs.extend(utc);
  }

  async getTimekeeping(
    employeeId: number,
    year: number,
    month: number,
    day: number,
  ) {
    console.log('getTimekeeping called');
    console.log('employeeId:' + employeeId);

    let timekeeping = await this.prisma.timekeeping.findFirst({
      where: {
        employee_id: employeeId,
        date: dayjs()
          .year(year)
          .month(month - 1)
          .date(day)
          .startOf('date')
          .toISOString(),
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
    console.log(timekeeping);

    return timekeeping;
  }

  async getTimekeepingByMonth(employeeId: number, year: number, month: number) {
    const timekeepingsList = await this.prisma.timekeeping.findMany({
      where: {
        employee_id: employeeId,
        date: {
          gte: dayjs()
            .year(year)
            .month(month - 1)
            .startOf('month')
            .toISOString(),
          lte: dayjs()
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
    const now = dayjs();

    const timekeeping = await this.prisma.timekeeping.findFirst({
      where: {
        employee_id: employeeId,
        date: now.startOf('date').toISOString(),
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
    const morningShiftStartSchedule = now
      .hour(schedule.morning_shift_start.getHours())
      .minute(schedule.morning_shift_start.getMinutes());

    const morningShiftEndSchedule = now
      .hour(schedule.morning_shift_end.getHours())
      .minute(schedule.morning_shift_end.getMinutes());

    const afternoonShiftStartSchedule = now
      .hour(schedule.afternoon_shift_start.getHours())
      .minute(schedule.afternoon_shift_start.getMinutes());

    const afternoonShiftEndSchedule = now
      .hour(schedule.afternoon_shift_end.getHours())
      .minute(schedule.afternoon_shift_end.getMinutes());

    console.log(now.isBefore(morningShiftStartSchedule.add(2, 'hours')));
    console.log(now);
    console.log(morningShiftStartSchedule.add(2, 'hours'));

    // user can check in start max 2 hours late;
    // others max 30 minutes late;
    // last check out = check in start late time + schedule time + 30 minutes;
    if (
      !timekeeping.morning_shift_start &&
      now.isBefore(morningShiftStartSchedule.add(2, 'hours'))
    ) {
      await this.prisma.timekeeping.update({
        where: {
          id: timekeeping.id,
        },
        data: {
          morning_shift_start: now.toISOString(),
        },
      });
      return;
    }
    if (
      !timekeeping.morning_shift_end &&
      now.isBefore(morningShiftEndSchedule.add(30, 'minutes'))
    ) {
      await this.prisma.timekeeping.update({
        where: {
          id: timekeeping.id,
        },
        data: {
          morning_shift_end: now.toISOString(),
        },
      });
      return;
    }
    if (
      !timekeeping.afternoon_shift_start &&
      now.isBefore(afternoonShiftStartSchedule.add(30, 'minutes'))
    ) {
      await this.prisma.timekeeping.update({
        where: {
          id: timekeeping.id,
        },
        data: {
          afternoon_shift_start: now.toISOString(),
        },
      });
      return;
    }
    const morningShiftStartLateTime = dayjs(
      timekeeping.morning_shift_start,
    ).diff(morningShiftStartSchedule, 'minutes');
    if (
      !timekeeping.afternoon_shift_end &&
      now.isBefore(
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
          afternoon_shift_end: now.toISOString(),
        },
      });
      return;
    }
  }

  private async createTimekeeping(employeeId: number) {
    return await this.prisma.timekeeping.create({
      data: {
        employee_id: employeeId,
        date: dayjs().startOf('date').toISOString(),
      },
    });
  }
}
