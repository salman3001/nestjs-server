import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ProductsModule } from '../products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { model } from 'mongoose';
import { reviewSchema } from './schema/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'review', schema: reviewSchema }],
      'buyzone',
    ),
  ],
  controllers: [ReviewsController, ProductsModule],
  providers: [ReviewsService],
})
export class ReviewsModule {}
