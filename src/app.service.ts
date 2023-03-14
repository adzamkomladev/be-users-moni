import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findAllUsers({ limit = 20, page = 1 }) {
    const [users, usersCount] = await Promise.all([
      this.userModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: 'desc' }),
      this.userModel.count(),
    ]);

    return {
      users,
      page,
      pages: usersCount / limit,
      limit,
      total: usersCount,
    };
  }
}
