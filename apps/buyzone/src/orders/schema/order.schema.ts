import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

interface IOrder {
  building: string;
  street: string;
  city: string;
  mobile: number;
  pin: number;
  addressLine: string;
  country: string;
  status: string;
  payment: {
    method: string;
    paid: boolean;
  };
}

interface IProducts {
  productId: string;
  quantity: number;
  price: number;
}

@Schema({ timestamps: true })
export class Order {
  @Prop()
  userId: string;

  @Prop({
    type: [
      {
        productId: String,
        quantity: Number,
        price: Number,
      },
    ],
    _id: false,
  })
  products: IProducts;

  @Prop({
    type: {
      building: String,
      street: String,
      city: String,
      mobile: String,
      pin: Number,
      addressLine: String,
      country: String,
      status: String,
      payment: {
        method: String,
        paid: Boolean,
      },
    },
    _id: false,
  })
  deliveryAddress: IOrder;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
