import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SignInDto } from '~/auth/dto/sign-in.dto';

@ValidatorConstraint({ name: 'IsPasswordsMatchingConstraint', async: false })
export class IsPasswordsMatchingConstraint implements ValidatorConstraintInterface {
  validate(passwordRepeat: string, arg: ValidationArguments) {
    const obj = arg.object as SignInDto;
    return obj.password === passwordRepeat;
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return 'Введенные Вами пароли не совпадают';
  }
}
