import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserEntity } from '~/shared/module/user.entity';

export class UserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

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
  }
}
