import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { User, UserSchema } from './schemas/user.schema';

import { AppGateway } from './app.gateway';

import { AppService } from './app.service';

import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
        'mongodb://localhost/beUsersMoni'
    ),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppGateway, AppService],
})
export class AppModule {}
