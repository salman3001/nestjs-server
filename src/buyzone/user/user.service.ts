import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user', 'buyzone') private user: Model<userDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.user.create(createUserDto);
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return this.user.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
