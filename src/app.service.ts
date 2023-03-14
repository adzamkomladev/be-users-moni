import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interval } from '@nestjs/schedule';

import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AppService {
  private readonly logger: Logger;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    this.logger = new Logger(AppService.name);
  }

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
      pages: Math.ceil(usersCount / limit),
      limit,
      total: usersCount,
    };
  }

  @Interval(100000)
  async createUsers() {
    const totalUsers = faker.helpers.arrayElement([
      0, 1, 3, 0, 7, 0, 6, 4, 1, 0,
    ]);

    const users = [];

    for (let i = 0; i < totalUsers; i++) {
      const user = new this.userModel({
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        dateOfBirth: faker.date.birthdate(),
      });
      users.push(user.save());
    }

    if (totalUsers === 0) {
      this.logger.log(
        `TOTAL USERS CREATED = ${totalUsers}. This cron runs every 100sec`,
      );
      return;
    }

    const createdUsers = await Promise.all(users);

    this.logger.log(
      `TOTAL USERS CREATED = ${totalUsers}. This cron runs every 100sec`,
    );
  }
}
