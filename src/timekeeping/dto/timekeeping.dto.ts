import { IsNotEmpty, IsString } from 'class-validator';

export class TimekeepingDto {
  @IsString()
  @IsNotEmpty()
  'qr_code_value': string;
}
