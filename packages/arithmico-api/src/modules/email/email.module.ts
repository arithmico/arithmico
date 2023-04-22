import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EmailService } from './email.service';
import { eventHandlers } from './events';

@Module({
  imports: [CqrsModule],
  providers: [...eventHandlers, EmailService],
})
export class EmailModule {}
