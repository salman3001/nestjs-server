import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Authguard } from '../guards/Auth.guard';
import { isAdminGuard } from '../guards/isAdmin.guard';
import { User } from '../decorators/user.decorator';
import { IUser } from '../user/interface/user.interface';
import { IStatus } from './orderQuery,interface';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(Authguard)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @UseGuards(Authguard)
  async findAll(@User() user: IUser, @Query('status') status: IStatus) {
    if (user.isAdmin) {
      const orders = await this.ordersService.findAll(status);
      return orders;
    }
    const orders = await this.ordersService.findByUserId(user.id, status);
    return orders;
  }

  @Get(':id')
  @UseGuards(Authguard)
  async findOne(@Param('id') id: string, @User() user: IUser) {
    const order = await this.ordersService.findOne(id);

    if (user.isAdmin || order.userId === user.id) {
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
}
