import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsPasswordsMatchingConstraint } from '~/libs/common/decorators/is-passwords-matching-constraint.decorator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty({ message: 'Полe Name обязательно для заполнения.' })
  name: string;

  @IsString()
  @IsEmail({}, { message: 'Неккоректный формат Email.' })
  @IsNotEmpty({ message: 'Полe Email обязательно для заполнения.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Поле Password обязательно для заполнения.' })
  @MinLength(6, {
    message: 'Пароль должен содержать минимум 6 символов.',
  })
  password: string;

  @Validate(IsPasswordsMatchingConstraint, {
    message: 'Введенные Вами пароли не совпадают',
  })
  passwordRepeat: string;
}
