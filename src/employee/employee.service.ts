import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AvatarDto, EmployeeDto } from './dto';

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
        start_date: dto.start_date,
        user_id: userId,
      },
    });
  }

  async updateAvatar(userId: number, dto: AvatarDto) {
    const employee = await this.getEmployee(userId);
    await this.prisma.employee.update({
      where: {
        id: employee.id,
      },
      data: {
        avatar: Buffer.from(dto.avatar),
      },
    });
  }
}
