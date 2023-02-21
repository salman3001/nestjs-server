import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type productDocument = HydratedDocument<product>;

@Schema({ timestamps: true })
export class product {
  @Prop()
  userId: mongoose.Types.ObjectId;

  @Prop()
  products: {
    productId: string;
    quantity: string;
    price: string;
  };

  @Prop()
  deliveryAddress: {
    building: string;
    street: string;
    city: string;
    mobile: string;
    pin: number;
    addressLine: string;
    country: 'UAE';
    status: 'Pending' | 'Confirmed' | 'Delivered' | 'Cancled';
    payment: {
      mode: 'cod' | 'card';
      paid: boolean;
    };
  };
}

export const productSchema = SchemaFactory.createForClass(product);
