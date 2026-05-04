import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInResponceDto } from './dto/sign-in-resp.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { RefreshTokenEntity } from '~/shared/module/refresh-token.entity';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Аутентификация' })
  @ApiParam({
    name: 'data',
    type: () => SignInDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Если пользователь с таким email не наден (BadRequestException)',
  })
  @ApiResponse({
    status: 401,
    description: 'Если не правильный пароль (UnauthorizedException)',
  })
  @ApiResponse({
    status: 200,
    description: 'Access and Refresh tokens',
  })
  async signIn(@Body() data: SignInDto): Promise<SignInResponceDto> {
    return this.AuthService.signIn(data);
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiParam({
    name: 'data',
    type: () => SignUpDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Если пользователь с таким email уже существует (BadRequestException)',
  })
  @ApiResponse({
    status: 200,
    description: 'Access and Refresh tokens',
  })
  async singUp(@Body() data: SignUpDto): Promise<SignInResponceDto> {
    return this.AuthService.signUp(data);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Обновление Refresh токена' })
  @ApiParam({
    name: 'data',
    type: () => RefreshTokenEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Если не корректный Refresh token (UnauthorizedException)',
  })
  @ApiResponse({
    status: 200,
    description: 'Access and Refresh tokens',
  })
  async refreshToken(
    @Body() data: RefreshTokenEntity,
  ): Promise<SignInResponceDto> {
    return this.AuthService.refreshToken(data.token);
  }
}
