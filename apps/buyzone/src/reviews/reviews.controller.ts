import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../decorators/user.decorator';
import { IUser } from '../user/interface/user.interface';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get(':productId')
  findAll(@Param('productId') productId: string) {
    return this.reviewsService.findByProductId(productId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string, @User() user: IUser) {
    const review = await this.reviewsService.findOne(id);
    if (review.reviewedBy === user.id) {
      return this.reviewsService.remove(id);
    } else {
      throw new UnauthorizedException(
        'Sorry you are not authirized to perform this operation',
      );
    }
  }
}
