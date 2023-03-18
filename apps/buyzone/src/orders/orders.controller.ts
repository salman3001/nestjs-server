import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Authguard } from '../guards/Auth.guard';
import { isAdminGuard } from '../guards/isAdmin.guard';
import { User } from '../decorators/user.decorator';
import { IUser } from '../user/interface/user.interface';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(Authguard)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @UseGuards(Authguard, isAdminGuard)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @UseGuards(Authguard, isAdminGuard)
  async findOne(@Param('id') id: string, @User() user: IUser) {
    const order = await this.ordersService.findOne(id);
    if (user.isAdmin) {
      return order;
    } else if (order._id.toString() === user.id) {
      return order;
    } else {
      throw new UnauthorizedException(
        'Sorry! You are not authorized to access this resources',
      );
    }
  }

  @Patch(':id')
  @UseGuards(Authguard, isAdminGuard)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @UseGuards(Authguard)
  @Get(':userId')
  async getUserOrder(@Param('userId') userId: string) {
    const orders = await this.ordersService.findByUserId(userId);
    if (!orders) {
      throw new NotFoundException('No Order found for this user');
    }
    return orders;
  }
}
