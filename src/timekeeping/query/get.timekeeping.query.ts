import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { IsOptional } from 'class-validator';

export class GetTimekeepingQuery {
  @IsNumber()
  @Type(() => Number)
  y: number;

  @IsNumber()
  @Type(() => Number)
  m: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  d: number;
}
