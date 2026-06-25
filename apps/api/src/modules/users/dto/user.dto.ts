import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { basename } from 'node:path';
import { UserEntity } from '~/shared/user.entity';

export class UserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  icon: null | string;

  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  constructor(data: UserEntity) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    this.icon = data.icon ? `uploads/${basename(data.icon)}` : null;
  }
}
