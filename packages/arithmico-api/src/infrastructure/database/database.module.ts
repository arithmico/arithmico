import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserActivationRepository } from './repositories/user-activation.repository';
import { UserRepository } from './repositories/user.repository';
import {
  UserActivation,
  UserActivationSchema,
} from './schemas/user-activation/user-activation.schema';
import { User, UserSchema } from './schemas/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: UserActivation.name,
        schema: UserActivationSchema,
      },
    ]),
  ],
  providers: [UserRepository, UserActivationRepository],
  exports: [UserRepository, UserActivationRepository],
})
export class DatabaseModule {}
