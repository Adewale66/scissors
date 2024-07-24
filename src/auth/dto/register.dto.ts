import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data transfer object for user registration.
 *
 * @class
 */
export class RegisterDto {
  /**
   * The email of the user.
   * @type {string}
   */
  @IsString()
  @IsNotEmpty()
  username: string;

  /**
   * The password of the user.
   * @type {string}
   */
  @IsNotEmpty()
  @IsString()
  password: string;
}
