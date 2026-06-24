import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  ParseFilePipeBuilder,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '~/modules/guards/auth.guard';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import type { AuthenticatedRequest } from '~/shared/types/jwt-payload';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from '../libs/common/decorators/user.decorator';
import { UserEntity } from '~/shared/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadIconDto } from './dto/updateIcon.dto';

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

  @Post('update')
  @ApiOperation({ summary: 'Вывод обновленного профилья пользователя' })
  @ApiParam({
    description: 'Из UserGuards достает индификатор пользователя',
    name: 'req',
  })
  @ApiResponse({
    description: 'UpdateUserDto',
    example: 'name: string, email: string',
    status: 200,
  })
  @UseGuards(AuthGuard)
  async updateProfile(
    @User() author: UserEntity,
    @Body() data: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.UserService.updateUser(author.id, data);
    if (!user) {
      throw new NotFoundException();
    }

    return new UserDto(user);
  }

  @Post('uploadIcon')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('icon'))
  uploadIcon(
    @User('id') id_author: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 1000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): Promise<UploadIconDto> {
    return this.UserService.uploadIcon(id_author, file);
  }
}
