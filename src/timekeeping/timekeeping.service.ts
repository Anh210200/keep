<<<<<<< HEAD
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { SchedulerRegistry } from '@nestjs/schedule/dist/scheduler.registry';
import { fail } from 'assert';
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
    let timekeepingToday = await this.prisma.timekeeping.findFirst({
      where: {
        employee_id: employeeId,
        date: {
          gte: dayjs
            .utc()
            .year(year)
            .month(month - 1)
            .date(day)
            .startOf('date')
            .toISOString(),
          lte: dayjs
            .utc()
            .year(year)
            .month(month - 1)
            .date(day)
            .startOf('date')
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
    if (!timekeepingToday) {
      timekeepingToday = await this.createTimekeepingToday(employeeId);
    }
    return timekeepingToday;
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
    });
    if (!timekeepingsList) {
      throw new ForbiddenException('notimekeepingfound');
    }
  }

  async qrCheck(employeeId: number, dto: TimekeepingDto) {
=======
import { Injectable, Post } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Schedule, Timekeeping } from '@prisma/client';
import dayjs from 'dayjs';
import e from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { TimeKeepingDto } from './dto';

@Injectable()
export class TimekeepingService {
  constructor(private prisma: PrismaService) {}

  async qrCheck(employeeId: number, dto: TimeKeepingDto) {
>>>>>>> a5ba481 (coding timekeeping func)
    const employee = await this.prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      select: {
        schedule_id: true,
      },
    });
<<<<<<< HEAD
    console.log(employee);
=======
>>>>>>> a5ba481 (coding timekeeping func)
    const schedule = await this.prisma.schedule.findUnique({
      where: {
        id: employee.schedule_id,
      },
    });
<<<<<<< HEAD

    const nowDayjsUtc = dayjs().utc().date(dayjs().date());
    const timeNowUnix = dayjs().year(1970).month(0).date(1).utc();
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
      throw new ForbiddenException('notimekeepingfound');
    }
    console.log(timekeeping);
    const qrCodeInDb = await this.prisma.qrCode.findFirst();
    const isQrCodeLegit = dto.qr_code_value === qrCodeInDb.id;
    if (isQrCodeLegit === false) {
      throw new ForbiddenException('qrcodennotmatch');
    }
    //user check in late 
    const thirtyminutesbeforenowinmilliseconds = timeNowUnix
      .subtract(30, 'minute')
      .valueOf();
    console.log('30 minutes before: %d', thirtyminutesbeforenowinmilliseconds);

    console.log('morningshiftstart: %d', schedule.afternoon_shift_start.getTime(),);

    console.log('morning_shift_end: %d', schedule.afternoon_shift_end.getTime());

    console.log('afternoon_shift_start: %d', schedule.afternoon_shift_start.getTime());

    console.log('afternoon_shift_end: %d', schedule.afternoon_shift_end.getTime());

    if (
      !timekeeping.morning_shift_start &&
      thirtyminutesbeforenowinmilliseconds < schedule.morning_shift_start.getTime()
    ) {
      await this.prisma.timekeeping.update({
=======
    let timekeeping = await this.prisma.timekeeping.findFirst({
      where: {
        employee_id: employeeId,
        date: new Date(),
      },
    });
    if (!timekeeping) {
      timekeeping = await this.prisma.timekeeping.create({
        data: {
          employee_id: employeeId,
          date: new Date(),
        },
      });
    }
    const now = dayjs();
    if (
      !schedule.morning_shift_start &&
      now.isBefore(dayjs(schedule.morning_shift_start).add(30, 'minutes'))
    ) {
      timekeeping = await this.prisma.timekeeping.update({
>>>>>>> a5ba481 (coding timekeeping func)
        where: {
          id: timekeeping.id,
        },
        data: {
<<<<<<< HEAD
          morning_shift_end: nowDayjsUtc.toISOString(),
=======
          morning_shift_start: new Date(),
>>>>>>> a5ba481 (coding timekeeping func)
        },
      });
      return;
    } else if (
<<<<<<< HEAD
      !timekeeping.afternoon_shift_start &&
      thirtyminutesbeforenowinmilliseconds < schedule.afternoon_shift_start.getTime()
    ) {
      await this.prisma.timekeeping.update({
=======
      !schedule.morning_shift_end &&
      now.isBefore(dayjs(schedule.morning_shift_end).add(30, 'minutes'))
    ) {
      timekeeping = await this.prisma.timekeeping.update({
>>>>>>> a5ba481 (coding timekeeping func)
        where: {
          id: timekeeping.id,
        },
        data: {
<<<<<<< HEAD
          afternoon_shift_start: nowDayjsUtc.toISOString(),
=======
          morning_shift_end: new Date(),
>>>>>>> a5ba481 (coding timekeeping func)
        },
      });
      return;
    } else if (
<<<<<<< HEAD
      !timekeeping.afternoon_shift_end &&
      thirtyminutesbeforenowinmilliseconds < schedule.afternoon_shift_end.getTime()
    ) {
      await this.prisma.timekeeping.update({
=======
      !schedule.afternoon_shift_start &&
      now.isBefore(dayjs(schedule.afternoon_shift_start).add(30, 'minutes'))
    ) {
      timekeeping = await this.prisma.timekeeping.update({
>>>>>>> a5ba481 (coding timekeeping func)
        where: {
          id: timekeeping.id,
        },
        data: {
<<<<<<< HEAD
          afternoon_shift_end: nowDayjsUtc.toISOString(),
=======
          afternoon_shift_start: new Date(),
        },
      });
      return;
    } else if (
      !schedule.afternoon_shift_end &&
      now.isBefore(dayjs(schedule.afternoon_shift_end).add(30, 'minutes'))
    ) {
      timekeeping = await this.prisma.timekeeping.update({
        where: {
          id: timekeeping.id,
        },
        data: {
          afternoon_shift_end: new Date(),
>>>>>>> a5ba481 (coding timekeeping func)
        },
      });
      return;
    }
<<<<<<< HEAD
  }

  private async createTimekeepingToday(employeeId: number) {
    const nowDayjsUtc = dayjs().utc().date(dayjs().date());
    return await this.prisma.timekeeping.create({
      data: {
        employee_id: employeeId,
        date: nowDayjsUtc.toDate(),
      },
    });
  }
}
=======
    await this.updateTimekeepingStatus(schedule, timekeeping);
  }

  @Cron(CronExpression.EVERY_DAY_AT_8PM)
  async updateTimekeepingStatus(schedule: Schedule, timekeeping: Timekeeping) {
    if (
      !timekeeping.morning_shift_start ||
      !timekeeping.morning_shift_end ||
      !timekeeping.afternoon_shift_start ||
      !timekeeping.afternoon_shift_end
    ) {
      await this.prisma.timekeeping.update({
        where: {
          id: timekeeping.id,
        },
        data: {
          status: -2,
        },
      });
    } else if (
      dayjs(timekeeping.morning_shift_start).isAfter(
        schedule.morning_shift_start,
      ) ||
      dayjs(timekeeping.morning_shift_end).isAfter(schedule.morning_shift_end)
      // dayjs()
    ) {
    }
  }
}
>>>>>>> a5ba481 (coding timekeeping func)
