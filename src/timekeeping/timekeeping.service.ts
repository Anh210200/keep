<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule/dist/';
import { CronJob } from 'cron/index';
>>>>>>> ee8371e (partly finish timekeeping)
import dayjs from 'dayjs';
=======
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { SchedulerRegistry } from '@nestjs/schedule/dist/scheduler.registry';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
>>>>>>> 56d80dd (finish timekeeping)
import { PrismaService } from 'src/prisma/prisma.service';
import { TimekeepingDto } from './dto';

@Injectable()
export class TimekeepingService {
  constructor(
    private prisma: PrismaService,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    dayjs.extend(utc);

    // const generateTimekeeping = new CronJob(
    //   CronExpression.MONDAY_TO_FRIDAY_AT_7AM,
    //   async () => {
    //     const employeeList = await this.prisma.employee.findMany({
    //       select: {
    //         id: true,
    //       },
    //       orderBy: {
    //         id: 'asc',
    //       },
    //     });
    //     employeeList.map(async (employee) => {
    //       await this.prisma.timekeeping.create({
    //         data: {
    //           employee_id: employee.id,
    //           date: new Date().toISOString(),
    //         },
    //       });
    //     });
    //   },
    // );
    // const updateStatus = new CronJob(
    //   CronExpression.MONDAY_TO_FRIDAY_AT_7PM,
    //   async () => {
    //     const timekeepingTodayList = await this.prisma.timekeeping.findMany({
    //       where: {
    //         date: new Date(),
    //         status: 0,
    //       },
    //     });
    //     timekeepingTodayList.map(async (timekeeping) => {
    //       const employee = await this.prisma.employee.findUnique({
    //         where: {
    //           id: timekeeping.employee_id,
    //         },
    //         select: {
    //           schedule_id: true,
    //         },
    //       });
    //       const schedule = await this.prisma.schedule.findUnique({
    //         where: {
    //           id: employee.schedule_id,
    //         },
    //       });
    //       if (
    //         !timekeeping.morning_shift_start &&
    //         !timekeeping.morning_shift_end &&
    //         !timekeeping.afternoon_shift_start &&
    //         !timekeeping.afternoon_shift_end
    //       ) {
    //         await this.prisma.timekeeping.update({
    //           where: {
    //             id: timekeeping.id,
    //           },
    //           data: {
    //             status: -3,
    //           },
    //         });
    //       } else if (
    //         !timekeeping.morning_shift_start ||
    //         !timekeeping.morning_shift_end ||
    //         !timekeeping.afternoon_shift_start ||
    //         !timekeeping.afternoon_shift_end
    //       ) {
    //         await this.prisma.timekeeping.update({
    //           where: {
    //             id: timekeeping.id,
    //           },
    //           data: {
    //             status: -2,
    //           },
    //         });
    //       } else if (
    //         dayjs(timekeeping.morning_shift_start).isAfter(
    //           schedule.morning_shift_start,
    //         ) ||
    //         dayjs(timekeeping.morning_shift_end).isAfter(
    //           schedule.morning_shift_end,
    //         )
    //       ) {
    //         await this.prisma.timekeeping.update({
    //           where: {
    //             id: timekeeping.id,
    //           },
    //           data: {
    //             status: -1,
    //           },
    //         });
    //       } else {
    //         await this.prisma.timekeeping.update({
    //           where: {
    //             id: timekeeping.id,
    //           },
    //           data: {
    //             status: 1,
    //           },
    //         });
    //       }
    //     });
    //   },
    // );
    // this.schedulerRegistry.addCronJob(
    //   'generateTimekeeping',
    //   generateTimekeeping,
    // );
    // this.schedulerRegistry.addCronJob('updateStatus', updateStatus);
    // generateTimekeeping.start();
    // updateStatus.start();
  }

<<<<<<< HEAD
<<<<<<< HEAD
  async qrCheck(employeeId: number, dto: TimeKeepingDto) {
>>>>>>> a5ba481 (coding timekeeping func)
=======
  async qrCheck(employeeId: number, qrCode: QrCodeDto) {
>>>>>>> ee8371e (partly finish timekeeping)
=======
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
>>>>>>> 56d80dd (finish timekeeping)
    const employee = await this.prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      select: {
        schedule_id: true,
      },
    });
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    console.log(employee);
=======
>>>>>>> a5ba481 (coding timekeeping func)
=======
    console.log(employee);
>>>>>>> 56d80dd (finish timekeeping)
=======
>>>>>>> f9f0d96 (tuan 5)
    const schedule = await this.prisma.schedule.findUnique({
      where: {
        id: employee.schedule_id,
      },
    });
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 56d80dd (finish timekeeping)

    const nowDayjsUtc = dayjs().utc().date(dayjs().date());

    const timekeeping = await this.prisma.timekeeping.findFirst({
<<<<<<< HEAD
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
=======
>>>>>>> 56d80dd (finish timekeeping)
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
    const morningShiftStartToday = dayjs(schedule.morning_shift_start)
      .year(nowDayjsUtc.year())
      .month(nowDayjsUtc.month())
      .date(nowDayjsUtc.date());
    const morningShiftEndToday = dayjs(schedule.morning_shift_end)
      .year(nowDayjsUtc.year())
      .month(nowDayjsUtc.month())
      .date(nowDayjsUtc.date());
    const afternoonShiftStartToday = dayjs(schedule.afternoon_shift_start)
      .year(nowDayjsUtc.year())
      .month(nowDayjsUtc.month())
      .date(nowDayjsUtc.date());
    const afternoonShiftEndToday = dayjs(schedule.afternoon_shift_end)
      .year(nowDayjsUtc.year())
      .month(nowDayjsUtc.month())
      .date(nowDayjsUtc.date());
    // user can check in 30 minutes late;
    if (
      !timekeeping.morning_shift_start &&
      nowDayjsUtc.isBefore(morningShiftStartToday.add(30, 'minutes'))
    ) {
<<<<<<< HEAD
      timekeeping = await this.prisma.timekeeping.update({
>>>>>>> a5ba481 (coding timekeeping func)
=======
      await this.prisma.timekeeping.update({
>>>>>>> ee8371e (partly finish timekeeping)
        where: {
          id: timekeeping.id,
        },
        data: {
<<<<<<< HEAD
<<<<<<< HEAD
          morning_shift_end: nowDayjsUtc.toISOString(),
=======
          morning_shift_start: new Date(),
>>>>>>> a5ba481 (coding timekeeping func)
        },
      });
      return;
<<<<<<< HEAD
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
=======
    }
    if (
      !schedule.morning_shift_end &&
      now.isBefore(dayjs(schedule.morning_shift_end).add(30, 'minutes'))
=======
          morning_shift_start: nowDayjsUtc.toISOString(),
        },
      });
      return;
    } else if (
      !timekeeping.morning_shift_end &&
<<<<<<< HEAD
      thirtyMinutesBeforeNowInMilliseconds <
        schedule.morning_shift_end.getTime()
>>>>>>> 56d80dd (finish timekeeping)
=======
      nowDayjsUtc.isBefore(morningShiftEndToday.add(30, 'minutes'))
>>>>>>> f9f0d96 (tuan 5)
    ) {
      await this.prisma.timekeeping.update({
>>>>>>> ee8371e (partly finish timekeeping)
        where: {
          id: timekeeping.id,
        },
        data: {
<<<<<<< HEAD
<<<<<<< HEAD
          afternoon_shift_start: nowDayjsUtc.toISOString(),
=======
          morning_shift_end: new Date(),
>>>>>>> a5ba481 (coding timekeeping func)
        },
      });
      return;
<<<<<<< HEAD
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
=======
    }
    if (
      !schedule.afternoon_shift_start &&
      now.isBefore(dayjs(schedule.afternoon_shift_start).add(30, 'minutes'))
=======
          morning_shift_end: nowDayjsUtc.toISOString(),
        },
      });
      return;
    } else if (
      !timekeeping.afternoon_shift_start &&
<<<<<<< HEAD
      thirtyMinutesBeforeNowInMilliseconds <
        schedule.afternoon_shift_start.getTime()
>>>>>>> 56d80dd (finish timekeeping)
=======
      nowDayjsUtc.isBefore(afternoonShiftStartToday.add(30, 'minutes'))
>>>>>>> f9f0d96 (tuan 5)
    ) {
      await this.prisma.timekeeping.update({
>>>>>>> ee8371e (partly finish timekeeping)
        where: {
          id: timekeeping.id,
        },
        data: {
<<<<<<< HEAD
<<<<<<< HEAD
          afternoon_shift_end: nowDayjsUtc.toISOString(),
=======
          afternoon_shift_start: new Date(),
=======
          afternoon_shift_start: nowDayjsUtc.toISOString(),
>>>>>>> 56d80dd (finish timekeeping)
        },
      });
      return;
    } else if (
      !timekeeping.afternoon_shift_end &&
      nowDayjsUtc.isBefore(afternoonShiftEndToday.add(30, 'minutes'))
    ) {
      await this.prisma.timekeeping.update({
        where: {
          id: timekeeping.id,
        },
        data: {
<<<<<<< HEAD
          afternoon_shift_end: new Date(),
>>>>>>> a5ba481 (coding timekeeping func)
=======
          afternoon_shift_end: nowDayjsUtc.toISOString(),
>>>>>>> 56d80dd (finish timekeeping)
        },
      });
      return;
    }
<<<<<<< HEAD
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

  private async createTimekeepingToday(employeeId: number) {
    const nowDayjsUtc = dayjs().utc().date(dayjs().date()).startOf('date');
    return await this.prisma.timekeeping.create({
      data: {
        employee_id: employeeId,
        date: nowDayjsUtc.toISOString(),
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
=======
>>>>>>> ee8371e (partly finish timekeeping)
  }
}
>>>>>>> a5ba481 (coding timekeeping func)
