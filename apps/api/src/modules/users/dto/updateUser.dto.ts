import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserEntity } from '~/shared/user.entity';

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  name?: string;
}
