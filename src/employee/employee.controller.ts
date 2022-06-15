import { Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async getEmployee(@GetUser('id') userId: number) {
    return await this.employeeService.getEmployee(userId);
  }
}
