import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsEmail,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(2)
  lastName: string;

  @IsEmail()
  @Transform(({ value }) => (value as string).toLowerCase())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 10, { message: 'Password should only have 6 to 8 charectors' })
  password: string;
}
