import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import {
  ApiNotFoundResponse,
  ApiPermanentRedirectResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiPermanentRedirectResponse({ description: ' redirect to original url' })
  @ApiNotFoundResponse({ description: 'key not found' })
  @Get(':short')
  async getUrl(@Param('short') short: string, @Res() res: Response) {
    return await this.appService.redirect(short, res);
  }
}
