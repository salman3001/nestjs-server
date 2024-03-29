import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ISearch, IStatus } from './orderQuery,interface';
import { OrderDocument, Order } from './schema/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name, 'buyzone')
    private readonly Order: Model<OrderDocument>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);

    const order = await this.Order.create(createOrderDto);
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

  async findAll(status: IStatus) {
    const search: ISearch = {};
    if (status != null) search.status = status;

    const orders = await this.Order.find({ ...search });
    if (status != null) search.status = status;
    if (!orders) {
      throw new NotFoundException();
    }
    return orders;
  }

  async findOne(id: string) {
    const order = await this.Order.findById(id);
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const updatedOrder = await this.Order.findByIdAndUpdate(id, updateOrderDto);
    if (!updatedOrder) {
      throw new NotFoundException();
    }
    return updatedOrder;
  }

  async findByUserId(userId: string, status: IStatus) {
    const search: ISearch = {};
    if (status != null) search.status = status;

    const orders = await this.Order.find({ userId, ...search });
    if (!orders) {
      throw new NotFoundException();
    }
    return orders;
  }
}
