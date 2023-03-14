import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';

import { AppController } from './app.controller';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/beUsersMoni'),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
