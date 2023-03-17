import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop()
  userId: string;

  @Prop()
  products: Array<{
    productId: string;
    quantity: string;
    price: string;
  }>;

  // @Prop()
  // deliveryAddress: {};
  // // {
  // //   building: string;
  // //   street: string;
  // //   city: string;
  // //   mobile: string;
  // //   pin: number;
  // //   addressLine: string;
  // //   // country: 'UAE';
  // //   // status: 'Pending' | 'Confirmed' | 'Delivered' | 'Cancled';
  // //   // payment: {
  // //   //   mode: 'cod' | 'card';
  // //   //   paid: boolean;
  // //   // };
  // // };
}

export const OrderSchema = SchemaFactory.createForClass(Order);
