import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import {
  SecurityPolicyAttachment,
  SecurityPolicyAttachmentDocument,
  SecurityPolicyAttachmentType,
} from '../../schemas/security-policy-attachment/security-policy-attachment.schema';
import {
  SecurityPolicy,
  SecurityPolicyDocument,
} from '../../schemas/security-policy/security-policy.schema';

@Injectable()
export class SecurityPolicyRepository {
  constructor(
    @InjectModel(SecurityPolicy.name)
    private securityPolicyModel: Model<SecurityPolicyDocument>,

    @InjectModel(SecurityPolicyAttachment.name)
    private securityPolicyAttachmentModel: Model<SecurityPolicyAttachmentDocument>,
  ) {}

  async createSecurityPolicy(
    name: string,
    attributes: string[],
    readonly: boolean,
  ): Promise<SecurityPolicyDocument> {
    const newPolicy: SecurityPolicy = {
      name,
      readonly,
      attributes: [...new Set(attributes).values()],
      createdAt: new Date(),
    };
    return this.securityPolicyModel.create(newPolicy);
  }

  async deleteSecurityPolicy(policyId: string): Promise<void> {
    const isStillAttached =
      (await this.securityPolicyAttachmentModel
        .find({
          policyId: policyId,
        })
        .count()
        .exec()) > 0;

    if (isStillAttached) {
      throw new BadRequestException(
        'The security policy is still attached to something.',
      );
    }

    const result = await this.securityPolicyModel
      .deleteOne({
        _id: policyId,
        readonly: false,
      })
      .exec();

    if (result.deletedCount < 1) {
      throw new NotFoundException();
    }
  }

  async findSecurityPolicyByName(
    name: string,
  ): Promise<SecurityPolicyDocument | null> {
    return this.securityPolicyModel
      .findOne({
        name,
      })
      .exec();
  }

  async findSecurityPolicyByNameOrThrow(
    name: string,
  ): Promise<SecurityPolicyDocument> {
    const securityPolicy = await this.findSecurityPolicyByName(name);
    if (!securityPolicy) {
      throw new NotFoundException();
    }
    return securityPolicy;
  }

  async getSecurityPolicies(
    skip: number,
    limit: number,
    exclude: string[],
  ): Promise<PagedResponse<SecurityPolicyDocument & { principals: number }>> {
    const result = await this.securityPolicyModel
      .aggregate()
      .sort({ name: -1 })
      .match({
        _id: {
          $nin: exclude,
        },
      })
      .facet({
        items: [
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
          {
            $lookup: {
              from: this.securityPolicyAttachmentModel.collection.name,
              localField: '_id',
              foreignField: 'policyId',
              as: 'principals',
            },
          },
          {
            $addFields: {
              principals: { $size: '$principals' },
            },
          },
        ],
        total: [
          {
            $count: 'count',
          },
        ],
      })
      .project({
        items: 1,
        total: { $arrayElemAt: ['$total.count', 0] },
      })
      .exec();

    return {
      items: result.at(0).items,
      skip,
      limit,
      total: result.at(0).total,
    };
  }

  async getSecurityPoliciesAttachedToUser(
    userId: string,
  ): Promise<SecurityPolicy[]> {
    const aggregationResult = await this.securityPolicyAttachmentModel
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
      .replaceRoot('$policies')
      .exec();

    return aggregationResult;
  }

  async getSecurityPoliciesAttachedToUserGroup(
    groupId: string,
    skip: number,
    limit: number,
  ): Promise<PagedResponse<SecurityPolicyDocument>> {
    const result = await this.securityPolicyAttachmentModel
      .aggregate()
      .match({
        attachmentType: SecurityPolicyAttachmentType.Group,
        attachedToId: groupId,
      })
      .lookup({
        from: this.securityPolicyModel.collection.name,
        localField: 'policyId',
        foreignField: '_id',
        as: 'policies',
      })
      .unwind('$policies')
      .replaceRoot('$policies')
      .facet({
        items: [{ $skip: skip }, { $limit: limit }],
        total: [
          {
            $count: 'count',
          },
        ],
      })
      .project({
        items: 1,
        total: { $arrayElemAt: ['$total.count', 0] },
      })
      .exec();

    return {
      items: result.at(0).items,
      total: result.at(0).total,
      skip: skip,
      limit: limit,
    };
  }

  async getSecurityPolicyByIdWithPrincipalStatistics(policyId: string): Promise<
    | (SecurityPolicyDocument & {
        principals: {
          total: number;
          users: number;
          groups: number;
        };
      })
    | null
  > {
    const result = await this.securityPolicyModel
      .aggregate()
      .match({ _id: policyId })
      .facet({
        policy: [{ $match: {} }],
        attachments: [
          {
            $lookup: {
              from: this.securityPolicyAttachmentModel.collection.name,
              localField: '_id',
              foreignField: 'policyId',
              as: 'attachments',
            },
          },
          { $unwind: '$attachments' },
          {
            $replaceRoot: {
              newRoot: '$attachments',
            },
          },
        ],
      })
      .facet({
        policy: [
          { $match: {} },
          { $unwind: '$policy' },
          { $replaceRoot: { newRoot: '$policy' } },
        ],
        principalsTotal: [{ $unwind: '$attachments' }],
        principalsUsers: [
          { $unwind: '$attachments' },
          {
            $match: {
              'attachments.attachmentType': SecurityPolicyAttachmentType.User,
            },
          },
        ],
        principalsGroups: [
          { $unwind: '$attachments' },
          {
            $match: {
              attachments: {
                attachmentType: SecurityPolicyAttachmentType.Group,
              },
            },
          },
        ],
      })
      .addFields({
        policy: {
          principals: {
            total: {
              $size: '$principalsTotal',
            },
            users: {
              $size: '$principalsUsers',
            },
            groups: {
              $size: '$principalsGroups',
            },
          },
        },
      })
      .unwind('$policy')
      .replaceRoot('policy')
      .exec();

    return result.at(0);
  }

  async getSecurityPolicyByIdWithPrincipalStatisticsOrThrow(
    policyId: string,
  ): Promise<
    SecurityPolicyDocument & {
      principals: {
        total: number;
        users: number;
        groups: number;
      };
    }
  > {
    const policyWithStatistics =
      await this.getSecurityPolicyByIdWithPrincipalStatistics(policyId);
    if (!policyWithStatistics) {
      throw new NotFoundException();
    }
    return policyWithStatistics;
  }

  async getSecurityPolicyById(
    policyId: string,
  ): Promise<SecurityPolicyDocument | null> {
    return this.securityPolicyModel.findById(policyId).exec();
  }

  async getSecurityPolicyByIdOrThrow(
    policyId: string,
  ): Promise<SecurityPolicy> {
    const securityPolicyDocument = this.getSecurityPolicyById(policyId);
    if (!securityPolicyDocument) {
      throw new NotFoundException();
    }
    return securityPolicyDocument;
  }

  async getSecurityPoliciesByIds(
    policyIds: string[],
  ): Promise<SecurityPolicy[]> {
    return this.securityPolicyModel
      .find({
        _id: {
          $in: policyIds,
        },
      })
      .exec();
  }

  async setSecurityPolicyName(
    policyId: string,
    name: string,
  ): Promise<SecurityPolicyDocument | null> {
    return await this.securityPolicyModel.findOneAndUpdate(
      {
        _id: policyId,
        readonly: false,
      },
      { name: name },
      { new: true },
    );
  }

  async setSecurityPolicyNameOrThrow(
    policyId: string,
    name: string,
  ): Promise<SecurityPolicyDocument> {
    const securityPolicyDocument = await this.setSecurityPolicyName(
      policyId,
      name,
    );
    if (!securityPolicyDocument) {
      throw new NotFoundException();
    }
    return securityPolicyDocument;
  }

  async setSecurityPolicyAttributes(
    policyId: string,
    attributes: string[],
  ): Promise<SecurityPolicyDocument | null> {
    const attributesWithoutDiplicates = [...new Set(attributes).values()];
    return await this.securityPolicyModel
      .findOneAndUpdate(
        {
          _id: policyId,
          readonly: false,
        },
        {
          attributes: attributesWithoutDiplicates,
        },
        { new: true },
      )
      .exec();
  }

  async setSecurityPolicyAttributesOrThrow(
    policyId: string,
    attributes: string[],
  ): Promise<SecurityPolicyDocument> {
    const securityPolicyDocument = await this.setSecurityPolicyAttributes(
      policyId,
      attributes,
    );
    if (!securityPolicyDocument) {
      throw new NotFoundException();
    }
    return securityPolicyDocument;
  }

  async addAttributesToSecurityPolicy(
    policyId: string,
    attributes: string[],
    force = false,
  ): Promise<SecurityPolicyDocument | null> {
    return this.securityPolicyModel
      .findOneAndUpdate(
        { _id: policyId, readonly: force },
        {
          $addToSet: {
            attributes: {
              $each: attributes,
            },
          },
        },
        { new: true },
      )
      .exec();
  }

  async addAttributesToSecurityPolicyOrThrow(
    policyId: string,
    attributes: string[],
    force = false,
  ) {
    const securityPolicyDocument = this.addAttributesToSecurityPolicy(
      policyId,
      attributes,
      force,
    );
    if (!securityPolicyDocument) {
      throw new NotFoundException();
    }
    return securityPolicyDocument;
  }

  async removeAttributesFromSecurityPolicy(
    policyId: string,
    attributes: string[],
    force = false,
  ): Promise<SecurityPolicyDocument | null> {
    return this.securityPolicyModel
      .findOneAndUpdate(
        {
          _id: policyId,
          readonly: force,
        },
        {
          $pull: {
            attributes: {
              $in: attributes,
            },
          },
        },
        {
          new: true,
        },
      )
      .exec();
  }

  async removeAttributesFromSecurityPolicyOrThrow(
    policyId: string,
    attributes: string[],
    force = false,
  ): Promise<SecurityPolicyDocument> {
    const securityPolicyDocument = this.removeAttributesFromSecurityPolicy(
      policyId,
      attributes,
      force,
    );
    if (!securityPolicyDocument) {
      throw new NotFoundException();
    }
    return securityPolicyDocument;
  }

  async attachToUser(
    policyId: string,
    userId: string,
  ): Promise<SecurityPolicyAttachmentDocument> {
    const existingAttachment = await this.securityPolicyAttachmentModel.findOne(
      {
        attachmentType: SecurityPolicyAttachmentType.User,
        policyId,
        attachedToId: userId,
      },
    );

    if (existingAttachment) {
      return existingAttachment;
    }

    const newAttachment: SecurityPolicyAttachment = {
      attachmentType: SecurityPolicyAttachmentType.User,
      policyId,
      attachedToId: userId,
    };
    return this.securityPolicyAttachmentModel.create(newAttachment);
  }

  async attachToGroup(
    policyId: string,
    groupId: string,
  ): Promise<SecurityPolicyAttachmentDocument> {
    const existingAttachment = await this.securityPolicyAttachmentModel.findOne(
      {
        attachmentType: SecurityPolicyAttachmentType.Group,
        policyId,
        attachedToId: groupId,
      },
    );

    if (existingAttachment) {
      return existingAttachment;
    }

    const newAttachment: SecurityPolicyAttachment = {
      attachmentType: SecurityPolicyAttachmentType.Group,
      policyId,
      attachedToId: groupId,
    };
    return this.securityPolicyAttachmentModel.create(newAttachment);
  }

  async detachFromUser(policyId: string, userId: string): Promise<void> {
    const result = await this.securityPolicyAttachmentModel
      .deleteOne({
        policyId,
        attachmentType: SecurityPolicyAttachmentType.User,
        attachedToId: userId,
      })
      .exec();

    if (result.deletedCount < 1) {
      throw new NotFoundException();
    }
  }

  async detachFromGroup(policyId: string, groupId: string): Promise<void> {
    const result = await this.securityPolicyAttachmentModel
      .deleteOne({
        policyId,
        attachmentType: SecurityPolicyAttachmentType.Group,
        attachedToId: groupId,
      })
      .exec();

    if (result.deletedCount < 1) {
      throw new NotFoundException();
    }
  }
}
