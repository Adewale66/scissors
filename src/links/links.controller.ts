import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { Public, UserReq } from '../decorators';
import { User } from '../users/entities/user.entity';
import { CustomLinkDto } from './dto/custom-link.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('api/links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Throttle({ default: { limit: 25, ttl: 600000 } })
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post()
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(createLinkDto);
  }

  @Throttle({ default: { limit: 20, ttl: 600000 } })
  @HttpCode(HttpStatus.CREATED)
  @Post('/custom')
  custom(@Body() createLinkDto: CustomLinkDto, @UserReq() user: User) {
    return this.linksService.custom(createLinkDto, user);
  }

  @Get()
  findAll(@UserReq() user: User) {
    return this.linksService.findAll(user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':domain')
  remove(@Param('domain') domain: string, @UserReq() user: User) {
    return this.linksService.remove(domain, user);
  }
}
