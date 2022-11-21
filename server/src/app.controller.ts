import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // getHello(@Request() req): string {
  //   return req.user;
  // }
}
