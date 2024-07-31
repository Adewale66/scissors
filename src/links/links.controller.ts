import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Ip,
  Param,
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

@ApiTags('links')
@Controller('api/links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Throttle({ default: { limit: 25, ttl: 600000 } })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiTooManyRequestsResponse({ description: 'Too many requests' })
  @ApiCreatedResponse({ description: 'Short link created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  create(@Body() createLinkDto: CreateLinkDto, @Ip() ip) {
    return this.linksService.create(createLinkDto, ip);
  }

  @ApiOkResponse({ description: 'All links founds' })
  @Get()
  findAll(
    @Ip() ip,
    @Param('limit') limit: string,
    @Param('offset') offset: string,
  ) {
    return this.linksService.findAll(ip, limit, offset);
  }
}
