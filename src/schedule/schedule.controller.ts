import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
// import { Schedule } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { ScheduleDto } from './dto';
import { ScheduleService } from './schedule.service';

@Controller('schedules')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @UseGuards(JwtGuard)
  @Get(':employee_id')
  async getSchedule(@Param('employee_id', ParseIntPipe) employee_id: number) {
    return await this.scheduleService.getSchedule(employee_id);
  }

  @UseGuards(JwtGuard)
  @Post(':employee_id/create')
  createSchedule(
    @Param('employee_id', ParseIntPipe) employee_id: number,
    @Body() dto: ScheduleDto,
  ) {
    console.log(dto);

    return this.scheduleService.createSchedule(employee_id, dto);
  }
}
