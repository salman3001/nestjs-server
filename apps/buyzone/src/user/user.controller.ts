import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Authguard } from '../guards/Auth.guard';
import { isAdminGuard } from '../guards/isAdmin.guard';
import { User } from '../decorators/user.decorator';
import { IUser } from './interface/user.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(Authguard, isAdminGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(Authguard)
  @Get(':id')
  findOne(@Param('id') id: string, @User() user: IUser) {
    if (user.isAdmin || user.id === id) {
      return this.userService.findOne(id);
    } else {
      throw new ForbiddenException();
    }
  }

  @Patch(':id')
  @UseGuards(Authguard)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: IUser,
  ) {
    if (user.isAdmin || user.id === id) {
      return this.userService.update(id, updateUserDto);
    } else {
      throw new ForbiddenException();
    }
  }

  @Delete(':id')
  @UseGuards(Authguard, isAdminGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
