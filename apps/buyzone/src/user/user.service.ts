import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, userDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, 'buyzone')
    private readonly user: Model<userDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.findByEmail(email);
    if (user) {
      throw new UnprocessableEntityException('Email Already exist');
    }
    const hashedPassword = this.createHashPassword(password);
    const createdUser = await this.user.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser;
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

  async createHashPassword(password) {
    const hashedPass = await hash(password, 10);
    return hashedPass;
  }
}
