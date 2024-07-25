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
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

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

  async findByUsername(username: string) {
    return await this.userRepository.findOneBy({
      username,
    });
  }

  async saveUser(user: User) {
    await this.userRepository.save(user);
    return {
      message: 'User created successfully.',
    };
  }
}
