import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserCreateDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.userModel.findById(id).exec();
  }

  async createUser(userCreateDto: UserCreateDto) {
    const { email, name, password } = userCreateDto;

    const foundedUser = await this.userModel.findOne({ email }).exec();

    if (foundedUser) {
      throw new ConflictException('User already exists');
    }

    return await this.userModel.create({ email, name, password });
  }

  async saveRefreshToken(userId: string, hash: string) {
    return await this.userModel
      .findByIdAndUpdate(userId, { refreshToken: hash })
      .exec();
  }

  async updateUser(id: string, UserUpdateDto: UserUpdateDto) {
    const foundedUser = await this.userModel.findById(id).exec();
    if (!foundedUser) {
      throw new NotFoundException('User not found');
    }
    await this.userModel.findByIdAndUpdate(id, UserUpdateDto).exec();

    return {
      message: 'User updated successfully',
      success: true,
    };
  }

  async deleteUser(id: string) {
    const foundedUser = await this.userModel.findById(id).exec();

    if (!foundedUser) {
      throw new ConflictException('User does not exist');
    }

    await this.userModel.findByIdAndDelete(id).exec();

    return {
      message: 'User deleted successfully',
      success: true,
    };
  }

  async findAll() {
    return await this.userModel.find().exec();
  }
}
