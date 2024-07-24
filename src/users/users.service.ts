import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

/**
 * Service for handling user requests
 *
 * @class UsersService
 */
@Injectable()
export class UsersService {
  /**
   * Creates an instance of UsersService
   *
   * @param {Repository<User>} userRepository - used for making database calls.
   */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Finds a user that matches the id
   *
   * @param {number} id The id of the user
   * @returns {Promise<User>} The user object
   * @throws {NotFoundException} Throws if user with the requested is not found.
   */

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword, ...data } = user;
    return data;
  }

  /**
   * Finds user by email.
   *
   * @param {string} email The email of the user.
   * @returns {Promise<User | undefined>} The user object.
   */
  async findByUsername(username: string) {
    return await this.userRepository.findOneBy({
      username,
    });
  }

  /**
   * Saves a user to the database.
   *
   * @param {User} user The user to save.
   * @returns {Object}
   */

  async saveUser(user: User) {
    await this.userRepository.save(user);
    return {
      message: 'User created successfully.',
    };
  }
}
