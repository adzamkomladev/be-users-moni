import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  findAllUsers(@Query('limit') limit?: number, @Query('page') page?: number) {
    return this.appService.findAllUsers({ limit, page });
  }
}
