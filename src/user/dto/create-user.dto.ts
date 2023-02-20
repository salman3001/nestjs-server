import { IsString, IsNotEmpty, Length, IsEmail, Allow } from 'class-validator';

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
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 10, { message: 'only 6 to 8 charectors allowed' })
  password: string;

  @Allow()
  isAdmin: boolean;
}
