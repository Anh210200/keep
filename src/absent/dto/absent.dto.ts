import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class AbsentDto {
  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @IsString()
  note: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
