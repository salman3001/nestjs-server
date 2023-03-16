import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

export class CreateProductDto {
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  inStock: number;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @Type(() => Number)
  totalReviews: number;

  @IsOptional()
  @Type(() => Number)
  averageStars: number;
}
