import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../src/decorators';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

/**
 * Controller for handling authentication routes.
 *
 * @controller
 */
// @UseGuards(ThrottlerGuard)
// @Throttle({
//   default: { limit: Number.parseInt(process.env.TTL), ttl: 300000 }, // remove this when done developing
// })
@Controller('auth')
export class AuthController {
  /**
   * Creates an instance of AuthController.
   *
   * @param {AuthService} authService - The authentication service.
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles user registration.
   *
   * @route {POST} /auth/register
   * @param {RegisterDto} registerDto - The registration details.
   * @returns {Promise<Object>} The response object containing user details.
   * @throws {HttpException} Throws an error if registration fails.
   */
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  /**
   * Handles user login.
   *
   * @route {POST} /auth/login
   * @param {LoginDto} loginDto - The login details.
   * @returns {Promise<Object>} The response object containing token and user details.
   * @throws {HttpException} Throws an error if login fails.
   */
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.signIn(loginDto);
  }
}
