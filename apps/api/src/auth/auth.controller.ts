import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInResponceDto } from './dto/sign-in-resp.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { RefreshTokenEntity } from '~/shared/module/refresh-token.entity';
import { AuthGuard } from '~/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() data: SignInDto): Promise<SignInResponceDto> {
    return this.AuthService.signIn(data);
  }

  @Post('sign-up')
  async singUp(@Body() data: SignUpDto): Promise<SignInResponceDto> {
    return this.AuthService.signUp(data);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() data: RefreshTokenEntity,
  ): Promise<SignInResponceDto> {
    return this.AuthService.refreshToken(data.token);
  }
}
