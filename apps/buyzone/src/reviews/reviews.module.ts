import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ProductsModule } from '../products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { review, reviewSchema } from './schema/review.schema';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature(
      [{ name: review.name, schema: reviewSchema }],
      'buyzone',
    ),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
