import {
  IsString,
  IsNotEmpty,
  Length,
  IsEmail,
  Allow,
  Validate,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20, { message: 'Last name only 2 to 20 charectors allowed' })
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 10, { message: 'Password should only have 6 to 8 charectors' })
  password: string;

  @Allow()
  isAdmin: boolean;
}
