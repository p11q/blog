import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInResponceDto } from './dto/sign-in-resp.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { RefreshTokenEntity } from '~/shared/refresh-token.entity';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('refresh-token')
  @ApiOperation({ summary: 'Обновление Refresh токена' })
  @ApiParam({
    name: 'data',
    type: () => RefreshTokenEntity,
  })
  @ApiResponse({
    description: 'Если не корректный Refresh token (UnauthorizedException)',
    status: 401,
  })
  @ApiResponse({
    description: 'Access and Refresh tokens',
    status: 200,
  })
  async refreshToken(
    @Body() data: RefreshTokenEntity,
  ): Promise<SignInResponceDto> {
    return this.AuthService.refreshToken(data.token);
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Аутентификация' })
  @ApiParam({
    name: 'data',
    type: () => SignInDto,
  })
  @ApiResponse({
    description:
      'Если пользователь с таким email не наден (BadRequestException)',
    status: 400,
  })
  @ApiResponse({
    description: 'Если не правильный пароль (UnauthorizedException)',
    status: 401,
  })
  @ApiResponse({
    description: 'Access and Refresh tokens',
    status: 200,
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
    description:
      'Если пользователь с таким email уже существует (BadRequestException)',
    status: 400,
  })
  @ApiResponse({
    description: 'Access and Refresh tokens',
    status: 200,
  })
  async singUp(@Body() data: SignUpDto): Promise<SignInResponceDto> {
    return this.AuthService.signUp(data);
  }
}
