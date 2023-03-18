import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from '../products/products.service';
import { CreateReviewDto } from './dto/create-review.dto';

import { Review, ReviewDocument } from './schema/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly productServices: ProductsService,
    @InjectModel(Review.name, 'buyzone')
    private readonly Review: Model<ReviewDocument>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const { productId, userId, totalStars } = createReviewDto;
    const isReviewExists = await this.Review.find({ productId, userId });

    if (isReviewExists) {
      throw new BadRequestException('Only one review is excepted per user');
    } else {
      const review = await this.Review.create(createReviewDto);
      const updatedProduct = await this.productServices.incrementReview(
        productId,
        totalStars,
      );
      return { review, updatedProduct };
    }
  }

  async findByProductId(productId: string) {
    const reviews = await this.Review.find({ productId });
    if (!reviews) {
      throw new HttpException(
        'No Review Found for this product',
        HttpStatus.NOT_FOUND,
      );
    }
    return reviews;
  }

  async findOne(id: string) {
    const review = await this.Review.findById(id);
    if (!review) throw new NotFoundException('This review was not found');
    return review;
  }

  async remove(id: string) {
    const deletedReview = this.Review.findByIdAndDelete(id);
    if (!deletedReview)
      throw new InternalServerErrorException('Failed to delete this review');
    return deletedReview;
  }
}
