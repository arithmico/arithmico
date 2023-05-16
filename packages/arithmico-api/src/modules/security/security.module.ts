import { Module } from '@nestjs/common';
import { PolicyModule } from './policy/policy.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [PolicyModule, GroupModule],
})
export class SecurityModule {}
