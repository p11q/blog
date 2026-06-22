import {
  Controller,
  Get,
  NotFoundException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '~/guards/auth.guard';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import type { AuthenticatedRequest } from '~/shared/types/jwt-payload';

@Controller('users')
export class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Вывод профилья пользователя' })
  @ApiParam({
    description: 'Из запроса достает индификатор пользователя',
    name: 'req',
  })
  @ApiResponse({
    description: 'UserDto',
    example: ' id: number, name: string, email: string,  role: string,',
    status: 200,
  })
  async getProfile(@Request() req: AuthenticatedRequest): Promise<UserDto> {
    const user = await this.UserService.getUserById(req.user.id);

    if (!user) {
      throw new NotFoundException();
    }

    return new UserDto(user);
  }
}
