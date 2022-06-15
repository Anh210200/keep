import {
  Body,
  Controller,
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
  @Post(':employeeId/create')
  createAbsentForm(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Body() dto: AbsentDto,
  ) {
    console.log(dto);
    return this.absentService.createAbsentForm(employeeId, dto);
  }
}
