import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserEntity } from '~/shared/module/user.entity';

export class UserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
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
