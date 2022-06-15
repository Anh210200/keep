import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
