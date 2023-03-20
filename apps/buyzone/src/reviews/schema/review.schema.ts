import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop()
  productId: string;

  @Prop()
  userId: string;

  @Prop()
  userName: string;

  @Prop()
  totalStars: number;

  @Prop()
  reviewMessage: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
