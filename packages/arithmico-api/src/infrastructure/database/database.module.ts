import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailRepository } from './repositories/email/email.repository';
import { MessageRepository } from './repositories/message/message.repository';
import { SecurityAttributesRepository } from './repositories/security-attributes/security-attributes.repository';
import { SecurityPolicyRepository } from './repositories/security-policy/security-policy.repository';
import { UserActivationRepository } from './repositories/user-activation/user-activation.repository';
import { UserGroupRepository } from './repositories/user-group/user-group.repository';
import { UserRepository } from './repositories/user/user.repository';
import { Email, EmailSchema } from './schemas/email/email.schema';
import { Message, MessageSchema } from './schemas/messege/messege.schema';
import {
  SecurityPolicyAttachment,
  SecurityPolicyAttachmentSchema,
} from './schemas/security-policy-attachment/security-policy-attachment.schema';
import {
  SecurityPolicy,
  SecurityPolicySchema,
} from './schemas/security-policy/security-policy.schema';
import {
  UserActivation,
  UserActivationSchema,
} from './schemas/user-activation/user-activation.schema';
import {
  UserGroupMembership,
  UserGroupMembershipSchema,
} from './schemas/user-group-membership/user-group-membership.schema';
import {
  UserGroup,
  UserGroupSchema,
} from './schemas/user-group/user-group.schema';
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
      {
        name: Message.name,
        schema: MessageSchema,
      },
      {
        name: SecurityPolicy.name,
        schema: SecurityPolicySchema,
      },
      {
        name: SecurityPolicyAttachment.name,
        schema: SecurityPolicyAttachmentSchema,
      },
      {
        name: UserGroup.name,
        schema: UserGroupSchema,
      },
      {
        name: UserGroupMembership.name,
        schema: UserGroupMembershipSchema,
      },
    ]),
  ],
  providers: [
    UserRepository,
    UserActivationRepository,
    EmailRepository,
    MessageRepository,
    SecurityPolicyRepository,
    SecurityAttributesRepository,
    UserGroupRepository,
  ],
  exports: [
    UserRepository,
    UserActivationRepository,
    EmailRepository,
    MessageRepository,
    SecurityPolicyRepository,
    SecurityAttributesRepository,
    UserGroupRepository,
  ],
})
export class DatabaseModule {}
