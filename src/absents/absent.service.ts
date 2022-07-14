import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import * as dayjs from 'dayjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { AbsentDto } from './dto';

@Injectable()
export class AbsentService {
  constructor(private prisma: PrismaService) {}

  async findAllAbsentForm(employeeId: number) {
    const absentList = await this.prisma.absent.findMany({
      where: {
        employee_id: employeeId,
      },
      select: {
        start_date: true,
        end_date: true,
        reason: true,
        note: true,
        status: true,
      },
    });
    return absentList;
  }

  async createAbsentForm(employeeId: number, dto: AbsentDto) {
    await this.prisma.absent.create({
      data: {
        employee_id: employeeId,
        start_date: dayjs(dto.start_date).toISOString(),
        end_date: dayjs(dto.end_date).toISOString(),
        reason: dto.reason,
        note: dto.note,
      },
    });
    return;
  }
}
