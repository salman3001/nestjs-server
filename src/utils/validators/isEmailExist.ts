import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { UserService } from 'src/user/user.service';

@ValidatorConstraint({ name: 'IsEmailExist', async: true })
export class IsEmailExistConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}
  validate(email: string, _args: ValidationArguments) {
    const user = this.userService.findByEmail(email);
    if (user) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Email ($value) aleardy exist! Please choose another email.';
  }
}

export function isEmailExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailExistConstraint,
    });
  };
}
