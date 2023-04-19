import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { commandControllers, commandHandlers } from './commands/indes';

@Module({
  imports: [DatabaseModule, CqrsModule],
  controllers: [...commandControllers],
  providers: [...commandHandlers],
})
export class UserModule {}
