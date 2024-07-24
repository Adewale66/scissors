import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as argon2 from 'argon2';
import { User } from '../../src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

/**
 * Interface for jwt payload
 *
 * @interface
 */

export interface Payload {
  sub: string;
  username: string;
}

/**
 * Service for handling user authentication and registration.
 *
 * @class AuthService
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of AuthService.
   *
   * @param {UsersService} userService - The service used to manage users.
   * @param {JwtService} jwtService - The service used for handling JWT tokens.
   */
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Authenticates a user and returns a JWT token.
   *
   * @async
   * @param {LoginDto} loginDto - The login credentials.
   * @returns {Promise<{ access_token: string }>} An object containing the access token.
   * @throws {UnauthorizedException} Throws if the email or password is invalid.
   */
  async signIn(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(loginDto.username);
    if (!user) {
      throw new UnauthorizedException('Invalid Email');
    }

    if (!(await argon2.verify(user.hashedPassword, loginDto.password))) {
      throw new UnauthorizedException('Invalid Password');
    }
    const payload: Payload = {
      sub: user.id,
      username: user.username,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  /**
   * Registers a new user and saves their information to the database.
   *
   * @async
   * @param {RegisterDto} registerDto - The registration details.
   * @returns {Promise<Object>} An object containing the message response.
   */
  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const hashedPassword = await argon2.hash(registerDto.password);
    const newUser = new User();
    newUser.username = registerDto.username;
    newUser.hashedPassword = hashedPassword;

    return this.userService.saveUser(newUser);
  }
}
