import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule],
})
export class AuthModule {}
