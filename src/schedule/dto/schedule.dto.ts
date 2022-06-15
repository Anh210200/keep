import { IsDateString, IsNotEmpty } from 'class-validator';

export class ScheduleDto {
  @IsDateString()
  @IsNotEmpty()
  morning_shift_start: string;
  @IsDateString()
  @IsNotEmpty()
  morning_shift_end: string;
  @IsDateString()
  @IsNotEmpty()
  afternoon_shift_start: string;
  @IsDateString()
  @IsNotEmpty()
  afternoon_shift_end: string;
}
