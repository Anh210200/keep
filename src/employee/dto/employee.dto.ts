import { Gender } from '@prisma/client';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class EmployeeDto {
  @IsString()
  @IsNotEmpty()
  code: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  gender: Gender;
  @IsString()
  @IsNotEmpty()
  phone_number: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsDateString()
  @IsNotEmpty()
  date_start: string;
}
