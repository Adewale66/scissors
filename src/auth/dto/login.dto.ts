import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data transfer object for user login.
 *
 * @class
 */
export class LoginDto {
  /**
   * The username of the user.
   * @type {string}
   */
  @IsString()
  @IsNotEmpty()
  username: string;

  /**
   * The password of the user.
   * @type {string}
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}
