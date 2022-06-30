import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto';

@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getEmployee(@GetUser('id') userId: number) {
    console.log(userId);
    
    return this.employeeService.getEmployee(userId);
  }

  @UseGuards(JwtGuard)
  @Post('create')
  createEmployee(@GetUser('id') userId: number, 
  @Body() dto: EmployeeDto) {
    return this.employeeService.createEmployee(userId, dto);
  }
}
