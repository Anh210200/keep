import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from 'src/auth/guard';
import { TimekeepingDto } from './dto';
import { TimekeepingService } from './timekeeping.service';
import { GetTimekeepingQuery } from './query';

@Controller('timekeeping')
export class TimekeepingController {
  constructor(private service: TimekeepingService) {}

  @UseGuards(JwtGuard)
  @Get(':employeeId')
  getTimekeeping(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Query() queryParams: GetTimekeepingQuery,
  ) {
    if (queryParams.d) {
      return this.service.getTimekeeping(
        queryParams.y,
        queryParams.m,
        queryParams.d,
        employeeId,
      );
    } else {
      return this.service.getTimekeepingByMonth(
        employeeId,
        queryParams.y,
        queryParams.m,
      );
    }
  }
  @UseGuards(JwtGuard)
  @Post(':employeeId/check')
  qrCheck(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Body() qrcode: TimekeepingDto,
  ) {
    console.log(qrcode);
    return this.service.qrCheck(employeeId, qrcode);
  }
}
