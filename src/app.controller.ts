import { Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import * as qrcode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
