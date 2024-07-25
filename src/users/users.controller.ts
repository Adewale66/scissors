import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../../src/decorators';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }
}
