import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../../src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

/**
 * The AuthModule is responsible for handling authentication.
 *
 * It imports the UsersModule for user-related functionalities and
 * JwtModule for JWT token management.
 *
 * @module AuthModule
 * @description
 * This module handles all authentication-related functionalities
 * including user registration and login. It uses the `UsersModule`
 * to manage user data and the `JwtModule` to handle JWT tokens.
 */
@Module({
  imports: [
    /**
     * The UsersModule is imported to handle user-related operations.
     */
    UsersModule,

    /**
     * The JwtModule is registered asynchronously to handle JWT tokens.
     *
     * @type {Module}
     * @returns {Object}
     * @property {string} secret - The secret key for signing JWT tokens.
     * @property {Object} signOptions - The options for signing JWT tokens.
     * @property {string} signOptions.expiresIn - The expiry duration for the JWT token.
     */
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  /**
   * The controllers managed by this module.
   *
   * @property {Array<Controller>} controllers - The array of controllers.
   * @description
   * The AuthController handles incoming requests related to authentication.
   */
  controllers: [AuthController],

  /**
   * The providers managed by this module.
   *
   * @property {Array<Provider>} providers - The array of providers.
   */
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: APP_GUARD,
      useExisting: AuthGuard,
    },
  ],
})
export class AuthModule {}
