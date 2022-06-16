import { IsNotEmpty, IsString } from 'class-validator';

<<<<<<< HEAD
export class TimekeepingDto {
  @IsString()
  @IsNotEmpty()
  'qr_code_value': string;
=======
export class TimeKeepingDto {
  @IsString()
  @IsNotEmpty()
  'id': string;
>>>>>>> a5ba481 (coding timekeeping func)
}
