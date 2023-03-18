import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class logindto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => (value as string).toLowerCase())
  email: string;

  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(1)
  password: string;
}
