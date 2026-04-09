import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsString()
  @IsEmail({}, { message: 'Неккоректный формат Email.' })
  @IsNotEmpty({ message: 'Полe Email обязательно для заполнения.' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Поле Password обязательно для заполнения.' })
  @MinLength(6, {
    message: 'Пароль должен содержать минимум 6 символов.',
  })
  password: string;
}
