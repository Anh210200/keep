<<<<<<< HEAD
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { IsOptional } from "class-validator";

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
=======
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

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
>>>>>>> 56d80dd (finish timekeeping)
