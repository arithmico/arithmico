import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { EmailModule } from './email/email.module';
import { ReleaseModule } from './release/release.module';

@Module({
  imports: [
    EmailModule,
    ReleaseModule,
    RouterModule.register([
      {
        path: 'releases',
        module: ReleaseModule,
      },
    ]),
  ],
})
export class BackofficeModule {}
