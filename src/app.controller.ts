import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get(':short')
  async getUrl(@Param('short') short: string, @Res() res: Response) {
    return await this.appService.redirect(short, res);
  }
}
