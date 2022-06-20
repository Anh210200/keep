import { IsNotEmpty, IsString } from 'class-validator';

<<<<<<< HEAD:src/timekeeping/dto/qrcode.dto.ts
<<<<<<< HEAD:src/timekeeping/dto/timekeeping.dto.ts
<<<<<<< HEAD
export class TimekeepingDto {
  @IsString()
  @IsNotEmpty()
  'qr_code_value': string;
=======
export class TimeKeepingDto {
=======
export class QrCodeDto {
>>>>>>> ee8371e (partly finish timekeeping):src/timekeeping/dto/qrcode.dto.ts
  @IsString()
  @IsNotEmpty()
  'id': string;
>>>>>>> a5ba481 (coding timekeeping func)
=======
export class TimekeepingDto {
  @IsString()
  @IsNotEmpty()
  'qr_code_value': string;
>>>>>>> 56d80dd (finish timekeeping):src/timekeeping/dto/timekeeping.dto.ts
}
