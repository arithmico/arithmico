import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { EmailServiceModule } from '../../infrastructure/email-service/email.module';
import { commandControllers, commandHandlers } from './commands/indes';
import { CreateSeedUserService } from './create-seed-user.service';
import { queryControllers, queryHandlers } from './queries';

@Module({
  imports: [DatabaseModule, CqrsModule, EmailServiceModule],
  controllers: [...commandControllers, ...queryControllers],
  providers: [...commandHandlers, ...queryHandlers, CreateSeedUserService],
})
export class UserModule {}
