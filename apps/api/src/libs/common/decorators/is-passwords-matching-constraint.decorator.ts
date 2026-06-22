import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SignInDto } from '~/auth/dto/sign-in.dto';

@ValidatorConstraint({ async: false, name: 'IsPasswordsMatchingConstraint' })
export class IsPasswordsMatchingConstraint
  implements ValidatorConstraintInterface
{
  defaultMessage(_validationArguments?: ValidationArguments): string {
    return 'Введенные Вами пароли не совпадают';
  }

  validate(passwordRepeat: string, arg: ValidationArguments): boolean {
    const obj = arg.object as SignInDto;

    return obj.password === passwordRepeat;
  }
}
