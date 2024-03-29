import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildJobRepository } from './repositories/build-job/build-job.repository';
import { ConfigurationRepository } from './repositories/configuration/configuration.repository';
import { EmailRepository } from './repositories/email/email.repository';
import { FeatureFlagVersionTagRelationRepository } from './repositories/feature-flag-version-tag-relation/feature-flag-version-tag-relation.respository';
import { FeatureFlagRepository } from './repositories/feature-flag/feature-flag.repository';
import { MessageRepository } from './repositories/message/message.repository';
import { SecurityAttributesRepository } from './repositories/security-attributes/security-attributes.repository';
import { SecurityPolicyRepository } from './repositories/security-policy/security-policy.repository';
import { UserActivationRepository } from './repositories/user-activation/user-activation.repository';
import { UserGroupMembershipRepository } from './repositories/user-group-membership/user-group-membership.repository';
import { UserGroupRepository } from './repositories/user-group/user-group.repository';
import { UserRepository } from './repositories/user/user.repository';
import { VersionTagRepository } from './repositories/version-tag/version-tag.repository';
import { BuildJob, BuildJobSchema } from './schemas/build-job/build-job.schema';
import {
  ConfigurationRevisionFeatureFlagAssociation,
  ConfigurationRevisionFeatureFlagAssociationSchema,
} from './schemas/configuration-revision-feature-flag-association/configuration-revision-feature-flag-association';
import {
  ConfigurationRevision,
  ConfigurationRevisionSchema,
} from './schemas/configuration-revision/configuration-revision.schema';
import {
  Configuration,
  ConfigurationSchema,
} from './schemas/configuration/configuration.schema';
import { Email, EmailSchema } from './schemas/email/email.schema';
import {
  FeatureFlag,
  FeatureFlagSchema,
} from './schemas/feature-flag/feature-flag.schema';
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
import {
  VersionTag,
  VersionTagSchema,
} from './schemas/version-tag/version-tag.schema';

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
      {
        name: VersionTag.name,
        schema: VersionTagSchema,
      },
      {
        name: FeatureFlag.name,
        schema: FeatureFlagSchema,
      },
      {
        name: Configuration.name,
        schema: ConfigurationSchema,
      },
      {
        name: ConfigurationRevision.name,
        schema: ConfigurationRevisionSchema,
      },
      {
        name: ConfigurationRevisionFeatureFlagAssociation.name,
        schema: ConfigurationRevisionFeatureFlagAssociationSchema,
      },
      {
        name: BuildJob.name,
        schema: BuildJobSchema,
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
    UserGroupMembershipRepository,
    VersionTagRepository,
    FeatureFlagRepository,
    FeatureFlagVersionTagRelationRepository,
    ConfigurationRepository,
    BuildJobRepository,
  ],
  exports: [
    UserRepository,
    UserActivationRepository,
    EmailRepository,
    MessageRepository,
    SecurityPolicyRepository,
    SecurityAttributesRepository,
    UserGroupRepository,
    UserGroupMembershipRepository,
    VersionTagRepository,
    FeatureFlagRepository,
    FeatureFlagVersionTagRelationRepository,
    ConfigurationRepository,
    BuildJobRepository,
  ],
})
export class DatabaseModule {}
