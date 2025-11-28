import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

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

  async createUser(email: string, password: string) {
    const foundedUser = await this.userModel.findOne({ email }).exec();

    if (foundedUser) {
      throw new ConflictException('User already exists');
    }

    return await this.userModel.create({ email, password });
  }

  async saveRefreshToken(userId: string, hash: string) {
    return await this.userModel
      .findByIdAndUpdate(userId, { refreshToken: hash })
      .exec();
  }
}
