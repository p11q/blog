import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '~/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignInResponceDto } from './dto/sign-in-resp.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { UserEntity } from '~/shared/module/user.entity';
import { MoreThan, Repository } from 'typeorm';
import { RefreshTokenEntity } from '~/shared/module/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'node:crypto';
import { JwtStrategy } from './jwt/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepo: Repository<RefreshTokenEntity>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: SignInDto): Promise<SignInResponceDto> {
    const user = await this.userService.getUserByEmail(data.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Password');
    }

    return this.getTokens(user);
  }

  async signUp(data: SignUpDto): Promise<SignInResponceDto> {
    const user = await this.userService.getUserByEmail(data.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashPass = await bcrypt.hash(data.password, 10);

    const userCreate = await this.userService.createUser(
      data.name,
      data.email,
      hashPass,
    );
    return this.getTokens(userCreate);
  }

  private generateSecureToken(): string {
    return randomBytes(48).toString('base64url');
  }

  async getTokens(user: UserEntity): Promise<SignInResponceDto> {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const refreshToken = new RefreshTokenEntity();
    refreshToken.token = this.generateSecureToken();

    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    refreshToken.expires = expires;
    refreshToken.user = user;

    const refreshTokenCreated = await refreshToken.save();

    const accessToken = await this.jwtService.signAsync(payload);
    return new SignInResponceDto(accessToken, refreshTokenCreated.token);
  }

  async refreshToken(token: string): Promise<SignInResponceDto> {
    const now = new Date();

    const refreshToken = await this.refreshTokenRepo.findOne({
      relations: ['user'],
      where: {
        token,
        expires: MoreThan(now),
      },
    });
    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.getTokens(refreshToken.user);
  }

  async validateUserById(userId: number) {
    return await this.userService.getUserById(userId);
  }
}
