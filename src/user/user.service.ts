import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private user: Model<userDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.user.create(createUserDto);
    return user;
  }

  async findAll() {
    const users = await this.user.find({}, { password: 0 });
    return users;
  }

  async findOne(id: string) {
    const user = await this.user.findById(id, { password: 0 });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.user.findOne({ email });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.user.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    return user;
  }

  async remove(id: string) {
    const user = await this.user.findByIdAndDelete(id);
    return user;
  }
}
