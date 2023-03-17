import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDocument, Order } from './schema/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name, 'buyzone')
    private readonly Order: Model<OrderDocument>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const order = await this.Order.create(createOrderDto);
    if (!order) {
      throw new HttpException(
        'Faled  to create Order. Please Try Again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return order;
  }

  async findAll() {
    const orders = await this.Order.find();
    if (!orders) {
      throw new HttpException(
        'Faled  to create Order. Please Try Again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return orders;
  }

  async findOne(id: string) {
    const order = await this.Order.findById(id);
    if (!order) {
      throw new HttpException(
        'Faled  to create Order. Please Try Again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      return order;
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const updatedOrder = await this.Order.findByIdAndUpdate(id, updateOrderDto);
    if (!updatedOrder) {
      throw new HttpException(
        'Faled  to create Order. Please Try Again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      return updatedOrder;
    }
  }

  async findByUserId(userId: string) {
    const orders = await this.Order.find({ userId });
    if (!orders) {
      throw new HttpException(
        'Faled  to create Order. Please Try Again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      return orders;
    }
  }
}
