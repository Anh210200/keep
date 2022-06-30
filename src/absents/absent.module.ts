import { Module } from '@nestjs/common';
import { AbsentController } from './absent.controller';
import { AbsentService } from './absent.service';

@Module({
  controllers: [AbsentController],
  providers: [AbsentService],
})
export class AbsentModule {}
