import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from './Schedules/schedule.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { EmployeeModule } from './employees/employee.module';
import { QrCodeModule } from './QR/qr_code.module';
import { AbsentModule } from './absents/absent.module';
import { ScheduleModule as appScheduleModule } from '@nestjs/schedule';
import { TimekeepingModule } from './timekeeping/timekeeping.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';

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
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: HttpErrorFilter
  }],
})
export class AppModule {}
