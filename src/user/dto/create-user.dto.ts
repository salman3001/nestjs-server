import { IsString, IsNotEmpty, Length, IsEmail, Allow } from 'class-validator';
import { isEmailExist } from 'src/utils/validators/isEmailExist';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20, { message: 'only 2 to 20 charectors allowed' })
  lastName: string;

  @IsEmail()
  @isEmailExist()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 10, { message: 'only 6 to 8 charectors allowed' })
  password: string;

  @Allow()
  isAdmin: boolean;
}
