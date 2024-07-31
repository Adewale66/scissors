import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLinkDto {
  @ApiProperty({
    example: 'http://google.com',
    description: 'The long url to shorten',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  originalUrl: string;

  @ApiProperty({
    example: 'alias',
    description: 'The custom alias',
    type: String,
  })
  @IsOptional()
  @IsString()
  alias: string;
}
