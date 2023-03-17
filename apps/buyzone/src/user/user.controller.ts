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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Authguard } from '../guards/Auth.guard';
import { isAdminGuard } from '../guards/isAdmin.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(Authguard)
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(Authguard)
  @UseGuards(isAdminGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(Authguard)
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(Authguard)
  @UseGuards(isAdminGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
