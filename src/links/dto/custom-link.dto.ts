import { IsNotEmpty, IsString } from 'class-validator';

export class CustomLinkDto {
  @IsNotEmpty()
  @IsString()
  domain: string;

  @IsNotEmpty()
  @IsString()
  originalUrl: string;
}
