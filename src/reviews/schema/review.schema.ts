import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type reviewDocument = HydratedDocument<review>;

@Schema({ timestamps: true })
export class review {
  @Prop()
  reviewedBy: mongoose.Types.ObjectId;

  @Prop()
  product: mongoose.Types.ObjectId;

  @Prop()
  rating: number;

  @Prop()
  comment: string;
}

export const reviewSchema = SchemaFactory.createForClass(review);
