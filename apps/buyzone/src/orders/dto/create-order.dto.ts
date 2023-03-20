import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

class DeliveryAddress {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  building: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  street: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  city: string;

  @IsNotEmpty()
  @Type(() => Number)
  mobile: number;

  @IsNotEmpty()
  @Type(() => Number)
  pin: number;

  @IsOptional()
  @MaxLength(40)
  addressLine: string;

  @IsNotEmpty()
  @IsIn(['UAE'])
  country: string;
}

class Payment {
  @IsNotEmpty()
  @IsIn(['cod', 'card'])
  mode: string;

  @IsNotEmpty()
  paid: boolean;
}

class Products {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  @Type(() => Number)
  quantity: number;

  @IsNotEmpty()
  @Type(() => Number)
  price: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Products)
  products: Products[];

  @ValidateNested()
  @Type(() => DeliveryAddress)
  deliveryAddress: DeliveryAddress;

  @IsNotEmpty()
  @IsIn(['Pending', 'Confirmed', 'Delivered', 'Cancled'])
  status: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Payment)
  payment: Payment;
}
