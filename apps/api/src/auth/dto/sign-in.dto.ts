import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description:
      'Email, с помощью которого был зарегистрирован пользователь (Поле не может быть пустым и иметь формат отличный от string)',
    example: 'example@example.com',
  })
  @IsString()
  @IsEmail({}, { message: 'Неккоректный формат Email.' })
  @IsNotEmpty({ message: 'Полe Email обязательно для заполнения.' })
  email: string;

  @ApiProperty({
    description:
      'Поле password должно иметь минимум 6 символов и не может иметь формат отличный от string',
  })
  @IsString()
  @IsNotEmpty({ message: 'Поле Password обязательно для заполнения.' })
  @MinLength(6, {
    message: 'Пароль должен содержать минимум 6 символов.',
  })
  password: string;
}
