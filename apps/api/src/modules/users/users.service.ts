import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EUserRole, UserEntity } from '~/shared/user.entity';

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
}
