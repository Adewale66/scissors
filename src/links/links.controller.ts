import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { Throttle } from '@nestjs/throttler';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('links')
@Controller('api/links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Throttle({ default: { limit: 10, ttl: 600000 } })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiTooManyRequestsResponse({ description: 'Too many requests' })
  @ApiCreatedResponse({ description: 'Short link created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  create(@Body() createLinkDto: CreateLinkDto, @Req() req: Request) {
    const userIp: string = req.headers['x-forwarded-for']
      .toString()
      .split(',')[0];
    console.log('userIp', userIp);
    return this.linksService.create(createLinkDto, userIp);
  }

  @ApiOkResponse({ description: 'All links founds' })
  @Get()
  findAll(
    @Req() req: Request,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    const userIp: string = req.headers['x-forwarded-for']
      .toString()
      .split(',')[0];
    return this.linksService.findAll(userIp, page, pageSize);
  }
}
