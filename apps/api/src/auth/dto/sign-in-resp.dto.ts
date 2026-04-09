import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SignInResponceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
