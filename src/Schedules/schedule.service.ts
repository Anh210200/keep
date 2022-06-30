import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScheduleDto } from './dto';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async getSchedule(employee_id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id: employee_id,
      },
      select: {
        schedule_id: true,
      },
    });
    if (!employee) {
      throw new ForbiddenException('no-employee-found');
    }
    if (!employee.schedule_id) {
      throw new ForbiddenException('no-schedule-found');
    }
    const schedule = await this.prisma.schedule.findUnique({
      where: {
        id: employee.schedule_id,
      },
    });
    if (!schedule) {
      throw new ForbiddenException('no-schedule-found');
    }
    return schedule;
  }

  async createSchedule(employee_id: number, dto: ScheduleDto) {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id: employee_id,
      },
    });
    if (!employee) {
      throw new ForbiddenException('no-employee-found');
    }
    const schedule = await this.prisma.schedule.create({
      data: {
        morning_shift_start: new Date(dto.morning_shift_start),
        morning_shift_end: new Date(dto.morning_shift_end),
        afternoon_shift_start: new Date(dto.afternoon_shift_start),
        afternoon_shift_end: new Date(dto.afternoon_shift_end),
      },
    });
    
    console.log(schedule);

    await this.prisma.employee.update({
      where: {
        id: employee_id,
      },
      data: {
        schedule_id: schedule.id,
      },
    });
    return;
  }
}
