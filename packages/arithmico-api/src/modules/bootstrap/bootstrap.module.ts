import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { BootstrapService } from './bootstrap.service';

@Module({
  imports: [CqrsModule, DatabaseModule],
  providers: [BootstrapService],
})
export class BootstrapModule {}
