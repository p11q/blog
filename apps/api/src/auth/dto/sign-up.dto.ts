import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsPasswordsMatchingConstraint } from '~/libs/common/decorators/is-passwords-matching-constraint.decorator';

export class SignUpDto {
  @ApiProperty({
    description:
      'Имя пользователя (Поле не может быть пустым и иметь формат отличный от string)',
    example: 'Иван Абрамов',
  })
  @IsString()
  @IsNotEmpty({ message: 'Полe Name обязательно для заполнения.' })
  name: string;

  @ApiProperty({
    description:
      'Email, с помощью которого будет регистрироваться пользователь (Поле не может быть пустым и иметь формат отличный от string)',
    example: 'example@example.com',
  })
  @IsString()
  @IsEmail({}, { message: 'Неккоректный формат Email.' })
  @IsNotEmpty({ message: 'Полe Email обязательно для заполнения.' })
  email: string;

  @ApiProperty({
    description:
      'Поле password при заполнении должно иметь минимум 6 символов и не может иметь формат отличный от string',
  })
  @IsString()
  @IsNotEmpty({ message: 'Поле Password обязательно для заполнения.' })
  @MinLength(6, {
    message: 'Пароль должен содержать минимум 6 символов.',
  })
  password: string;

  @ApiProperty({
    description:
      'Поле passwordRepeat при заполнении должно полностью соответствовать полю password',
  })
  @Validate(IsPasswordsMatchingConstraint, {
    message: 'Введенные Вами пароли не совпадают',
  })
  passwordRepeat: string;
}
