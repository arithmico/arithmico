import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailRepository } from './repositories/email.repository';
import { UserActivationRepository } from './repositories/user-activation.repository';
import { UserRepository } from './repositories/user.repository';
import { Email, EmailSchema } from './schemas/email/email.schema';
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
      {
        name: Email.name,
        schema: EmailSchema,
      },
    ]),
  ],
  providers: [UserRepository, UserActivationRepository, EmailRepository],
  exports: [UserRepository, UserActivationRepository, EmailRepository],
})
export class DatabaseModule {}
