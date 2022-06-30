import { ForbiddenException} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeDto } from './dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}
  async getEmployee(userId: number) {
    const employee = await this.prisma.employee.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!employee) {
      throw new ForbiddenException('no-employee-found');
    }
    delete employee.schedule_id, delete employee.user_id;
    return employee;
  }

  async createEmployee(userId: number, dto: EmployeeDto) {
    const employee = await this.prisma.employee.create({
      data: {
        code: dto.code,
        name: dto.name,
        gender: dto.gender,
        phone_number: dto.phone_number,
        address: dto.address,
        date_start: dto.date_start,
        user_id: userId,
      },
    });
  }
}
