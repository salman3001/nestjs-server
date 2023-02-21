import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

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

  @Prop()
  reviews: mongoose.Types.ObjectId[];
}

export const productSchema = SchemaFactory.createForClass(Product);
