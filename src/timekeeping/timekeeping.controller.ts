<<<<<<< HEAD
<<<<<<< HEAD
import { Body, 
  Controller, 
  Get,
  Param, 
  ParseIntPipe, 
  Post,
  Query,
  UseGuards, } from '@nestjs/common';

import { JwtGuard } from 'src/auth/guard';
import { TimekeepingDto } from './dto';
import { TimekeepingService } from './timekeeping.service';
import { GetTimekeepingQuery } from './query';

=======
import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { QrCodeDto } from './dto';
=======
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
import { GetTimekeepingQuery } from './query';
>>>>>>> 56d80dd (finish timekeeping)
import { TimekeepingService } from './timekeeping.service';
>>>>>>> a5ba481 (coding timekeeping func)

@Controller('timekeepings')
export class TimekeepingController {
  constructor(private service: TimekeepingService) {}

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 56d80dd (finish timekeeping)
  @UseGuards(JwtGuard)
  @Get(':employeeId')
  getTimekeeping(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Query() queryParams: GetTimekeepingQuery,
  ) {
<<<<<<< HEAD
    if (queryParams.d){
      return this.service.getTimekeeping(
        queryParams.y,
        queryParams.m,
        queryParams.d,
        employeeId,
      );
    } else{
=======
    if (queryParams.d) {
      return this.service.getTimekeeping(
        employeeId,
        queryParams.y,
        queryParams.m,
        queryParams.d,
      );
    } else {
>>>>>>> 56d80dd (finish timekeeping)
      return this.service.getTimekeepingByMonth(
        employeeId,
        queryParams.y,
        queryParams.m,
      );
    }
  }
<<<<<<< HEAD
  @UseGuards(JwtGuard)
  @Post(':employeeId/check')
  qrCheck(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Body() qrcode: TimekeepingDto,
  ) {
    console.log(qrcode);
    return this.service.qrCheck(employeeId, qrcode);
=======
  @Post(':employeeId/check')
=======

  @UseGuards(JwtGuard)
  @Post(':employeeId')
>>>>>>> 56d80dd (finish timekeeping)
  qrCheck(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Body() qrcode: TimekeepingDto,
  ) {
<<<<<<< HEAD
<<<<<<< HEAD
    return this.service.qrCheck(employeeId, dto);
>>>>>>> a5ba481 (coding timekeeping func)
=======
=======
    console.log(qrcode);
>>>>>>> 56d80dd (finish timekeeping)
    return this.service.qrCheck(employeeId, qrcode);
>>>>>>> ee8371e (partly finish timekeeping)
  }
}
