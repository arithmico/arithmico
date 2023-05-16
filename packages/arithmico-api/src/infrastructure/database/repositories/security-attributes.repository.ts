import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SecurityPolicyAttachment,
  SecurityPolicyAttachmentDocument,
  SecurityPolicyAttachmentType,
} from '../schemas/security-policy-attachment/security-policy-attachment.schema';
import {
  SecurityPolicy,
  SecurityPolicyDocument,
} from '../schemas/security-policy/security-policy.schema';
import { User, UserDocument } from '../schemas/user/user.schema';

@Injectable()
export class SecurityAttributesRepository {
  constructor(
    @InjectModel(SecurityPolicy.name)
    private securityPolicyModel: Model<SecurityPolicyDocument>,

    @InjectModel(SecurityPolicyAttachment.name)
    private securityPolicyAttachmentModel: Model<SecurityPolicyAttachmentDocument>,

    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async aggregateUserSecurityAttributes(userId: string): Promise<Set<string>> {
    const attributeDocuments = await this.securityPolicyAttachmentModel
      .aggregate()
      .match({
        attachmentType: SecurityPolicyAttachmentType.User,
        attachedToId: userId,
      })
      .lookup({
        from: this.securityPolicyModel.collection.name,
        localField: 'policyId',
        foreignField: '_id',
        as: 'policies',
      })
      .unwind('$policies')
      .unwind('$policies.attributes')
      .project({
        attributes: '$policies.attributes',
      })
      .group({
        _id: '$attributes',
      })
      .exec();

    return new Set(attributeDocuments.map((doc) => doc._id as string));
  }
}
