import { Module } from '@nestjs/common';
import { ReleaseService } from './release.service';

@Module({
  providers: [ReleaseService]
})
export class ReleaseModule {}
