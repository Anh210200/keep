import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { AbsentService } from './absent.service';
import { AbsentDto } from './dto';

@Controller('absents')
export class AbsentController {
  constructor(private absentService: AbsentService) {}

  @UseGuards(JwtGuard)
  @Get(':employeeId')
  findAbsentFormEndDateAfterToday(
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    return this.absentService.findAllAbsentForm(employeeId);
  }

  @UseGuards(JwtGuard)
  @Post(':employeeId/create')
  createAbsentForm(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Body() dto: AbsentDto,
  ) {
    return this.absentService.createAbsentForm(employeeId, dto);
  }
}
