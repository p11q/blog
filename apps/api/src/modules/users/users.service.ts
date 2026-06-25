import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { basename } from 'node:path';
import { Repository } from 'typeorm';
import { EUserRole, UserEntity } from '~/shared/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UploadIconDto } from './dto/updateIcon.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createUser(
    name: string,
    email: string,
    hashPass: string,
  ): Promise<UserEntity> {
    const user = new UserEntity();

    user.name = name;
    user.email = email.trim().toLowerCase();
    user.password = hashPass;
    user.role = EUserRole.user;

    return await user.save();
  }

  async getUserByEmail(email: string): Promise<null | UserEntity> {
    return await this.userRepo.findOne({
      where: {
        email,
      },
    });
  }

  async getUserById(id: number): Promise<null | UserEntity> {
    return await this.userRepo.findOne({
      where: {
        id,
      },
    });
  }

  async updateUser(
    id_author: number,
    data: UpdateUserDto,
  ): Promise<null | UserEntity> {
    await this.userRepo
      .update(
        {
          id: id_author,
        },
        {
          email: data.email,
          name: data.name,
        },
      )
      .catch(() => {
        throw new InternalServerErrorException();
      });

    return await this.getUserById(id_author);
  }

  async uploadIcon(
    id_author: number,
    file: Express.Multer.File,
  ): Promise<UploadIconDto> {
    await this.userRepo
      .update(
        {
          id: id_author,
        },
        {
          icon: file.path,
        },
      )
      .catch(() => {
        throw new InternalServerErrorException();
      });
    const author = await this.userRepo.findOne({ where: { id: id_author } });
    const icon = author?.icon ? `uploads/${basename(author.icon)}` : null;

    return new UploadIconDto(icon);
  }
}
