import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../../src/decorators';

/**
 * Controller for handiling user routes.
 *
 * @controller
 */
@Controller('users')
export class UsersController {
  /**
   * Creates an instance of UsersController
   *
   * @param {UsersService} usersService - The users service.
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Handles finding a particular user.
   *
   * @route {GET} /api/users/{id}
   * @param {number} id - The id of the user.
   * @returns {Promise<Object>} The response object.
   * @throws {NotFoundException} Throws an error if user can not be found.
   */
  @HttpCode(HttpStatus.OK)
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }
}
