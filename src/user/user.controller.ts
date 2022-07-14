import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get(':email')
  getUserId(@GetUser('id') userId: number) {
    return {
      id: userId,
    };
  }
}
