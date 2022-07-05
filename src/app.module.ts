import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

import { AbsentModule } from './absents/absent.module';
import { ScheduleModule as appScheduleModule } from '@nestjs/schedule';
import { TimekeepingModule } from './timekeeping/timekeeping.module';

import { ScheduleModule } from './schedule/schedule.module';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { QrCodeModule } from './qr_code/qr_code.module';
import { Module } from '@nestjs/common/decorators/modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    appScheduleModule.forRoot(),
    AuthModule,
    ScheduleModule,
    PrismaModule,
    UserModule,
    EmployeeModule,
    QrCodeModule,
    AbsentModule,
    TimekeepingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
