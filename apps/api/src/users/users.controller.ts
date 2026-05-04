import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '~/guards/auth.guard';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Вывод профилья пользователя' })
  @ApiParam({
    name: 'req',
    description: 'Из запроса достает индификатор пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'UserDto',
    example: ' id: number, name: string, email: string,  role: string,',
  })
  async getProfile(@Request() req): Promise<UserDto> {
    const user = await this.UserService.getUserById(req.user?.id);
    return new UserDto(user);
  }
}
