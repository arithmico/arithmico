import { Module } from '@nestjs/common';
import { PolicyModule } from './policy/policy.module';
import { GroupModule } from './group/group.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    PolicyModule,
    GroupModule,
    RouterModule.register([
      {
        path: 'security-policies',
        module: PolicyModule,
      },
    ]),
  ],
})
export class SecurityModule {}
