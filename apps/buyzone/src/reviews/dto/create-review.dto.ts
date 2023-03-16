import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  userName: string;

  @Type(() => Number)
  @IsNotEmpty({ message: 'Total Stars is a required field' })
  @Max(5, { message: 'Maximum 05 stars are allowed' })
  @Min(1, { message: 'minimum 01 start is required' })
  totalStars: number;

  @IsOptional()
  reviewMessage: string;
}
