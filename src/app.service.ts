import { Injectable, NotFoundException } from '@nestjs/common';
import { LinksService } from './links/links.service';
import { Response } from 'express';

@Injectable()
export class AppService {
  constructor(private linkService: LinksService) {}

  async redirect(short: string, res: Response) {
    const link = await this.linkService.findShort(short);

    if (!link) {
      throw new NotFoundException('Link not found');
    }
    link.clicks += 1;
    await this.linkService.update(link);
    res.redirect(link.originalUrl);
  }
}
