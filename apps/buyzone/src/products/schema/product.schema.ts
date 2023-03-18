import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type productDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop()
  images: string[];

  @Prop()
  category: string;

  @Prop()
  price: number;

  @Prop()
  inStock: number;

  @Prop()
  description: string;

  @Prop({ default: 0 })
  totalReviews: number;

  @Prop({ default: 0 })
  averageRating: number;
}

export const productSchema = SchemaFactory.createForClass(Product);
