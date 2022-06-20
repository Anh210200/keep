import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AbsentDto } from './dto';

@Injectable()
export class AbsentService {
  constructor(private prisma: PrismaService) {}

  async createAbsentForm(employeeId: number, dto: AbsentDto) {
    const absent = await this.prisma.absent.create({
      data: {
        employee_id: employeeId,
        end_date: new Date(dto.end_date),

        start_date: new Date(dto.start_date),
        reason: dto.reason,
        note: dto.note,
      },
    });
    return;
  }
}
