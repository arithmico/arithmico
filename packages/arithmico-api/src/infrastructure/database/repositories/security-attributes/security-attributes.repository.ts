import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SecurityPolicyAttachment,
  SecurityPolicyAttachmentDocument,
  SecurityPolicyAttachmentType,
} from '../../schemas/security-policy-attachment/security-policy-attachment.schema';
import {
  SecurityPolicy,
  SecurityPolicyDocument,
} from '../../schemas/security-policy/security-policy.schema';
import {
  UserGroupMembership,
  UserGroupMembershipDocument,
} from '../../schemas/user-group-membership/user-group-membership.schema';
import { User, UserDocument } from '../../schemas/user/user.schema';

@Injectable()
export class SecurityAttributesRepository {
  constructor(
    @InjectModel(SecurityPolicy.name)
    private securityPolicyModel: Model<SecurityPolicyDocument>,

    @InjectModel(SecurityPolicyAttachment.name)
    private securityPolicyAttachmentModel: Model<SecurityPolicyAttachmentDocument>,

    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    @InjectModel(UserGroupMembership.name)
    private userGroupMembershipModel: Model<UserGroupMembershipDocument>,
  ) {}

  async aggregateUserSecurityAttributes(userId: string): Promise<Set<string>> {
    const attributeDocuments = await this.userModel
      .aggregate()
      .match({ _id: userId })
      .facet({
        userPolicies: [
          {
            $lookup: {
              from: this.securityPolicyAttachmentModel.collection.name,
              localField: '_id',
              foreignField: 'attachedToId',
              as: 'policy',
            },
          },
          { $unwind: '$policy' },
          {
            $match: {
              'policy.attachmentType': SecurityPolicyAttachmentType.User,
            },
          },
          {
            $lookup: {
              from: this.securityPolicyModel.collection.name,
              localField: 'policy.policyId',
              foreignField: '_id',
              as: 'policy',
            },
          },
          {
            $unwind: '$policy',
          },
          {
            $replaceRoot: { newRoot: '$policy' },
          },
        ],

        groupPolicies: [
          {
            $lookup: {
              from: this.userGroupMembershipModel.collection.name,
              localField: '_id',
              foreignField: 'userId',
              as: 'group',
            },
          },
          { $unwind: '$group' },
          { $replaceRoot: { newRoot: '$group' } },
          {
            $lookup: {
              from: this.securityPolicyAttachmentModel.collection.name,
              localField: '_id',
              foreignField: 'attachedToId',
              as: 'policy',
            },
          },
          { $unwind: '$policy' },
          {
            $match: {
              'policy.attachmentType': SecurityPolicyAttachmentType.Group,
            },
          },
          {
            $lookup: {
              from: this.securityPolicyModel.collection.name,
              localField: 'policy.policyId',
              foreignField: '_id',
              as: 'policy',
            },
          },
          {
            $unwind: '$policy',
          },
          {
            $replaceRoot: { newRoot: '$policy' },
          },
        ],
      })
      .project({
        policies: {
          $setUnion: ['$userPolicies', '$groupPolicies'],
        },
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
