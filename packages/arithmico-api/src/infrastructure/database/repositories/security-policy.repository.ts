import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PagedResponse } from '../../../common/types/paged-response.dto';
import {
  SecurityPolicyAttachment,
  SecurityPolicyAttachmentDocument,
  SecurityPolicyAttachmentType,
} from '../schemas/security-policy-attachment/security-policy-attachment.schema';
import {
  SecurityPolicy,
  SecurityPolicyDocument,
} from '../schemas/security-policy/security-policy.schema';

@Injectable()
export class SecurityPolicyRepository {
  constructor(
    @InjectModel(SecurityPolicy.name)
    private securityPolicyModel: Model<SecurityPolicyDocument>,

    @InjectModel(SecurityPolicyAttachment.name)
    private securityPolicyAttachmentModel: Model<SecurityPolicyAttachmentDocument>,
  ) {}

  async create(
    name: string,
    attributes: string[],
  ): Promise<SecurityPolicyDocument> {
    const newPolicy: SecurityPolicy = {
      name,
      attributes: [...new Set(attributes).values()],
    };
    return this.securityPolicyModel.create(newPolicy);
  }

  async delete(policyId: string): Promise<void> {
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
      })
      .exec();

    if (result.deletedCount < 1) {
      throw new NotFoundException();
    }
  }

  async findByName(name: string): Promise<SecurityPolicyDocument | null> {
    return this.securityPolicyModel
      .findOne({
        name,
      })
      .exec();
  }

  async findByNameOrThrow(name: string): Promise<SecurityPolicyDocument> {
    const securityPolicy = await this.findByName(name);
    if (!securityPolicy) {
      throw new NotFoundException();
    }
    return securityPolicy;
  }

  async getPolicies(
    skip: number,
    limit: number,
  ): Promise<PagedResponse<SecurityPolicyDocument & { principals: number }>> {
    const result = await this.securityPolicyModel
      .aggregate()
      .sort({ name: -1 })
      .facet({
        items: [
          {
            $match: {},
          },
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

  async getPoliciesAttachedToUser(
    userId: string,
    skip: number,
    limit: number,
  ): Promise<PagedResponse<SecurityPolicy>> {
    const aggregationResult = (
      await this.securityPolicyAttachmentModel
        .aggregate()
        .facet({
          policies: [
            {
              $match: {
                attachmentType: SecurityPolicyAttachmentType.User,
                attachedToId: userId,
              },
            },
            {
              $lookup: {
                from: this.securityPolicyModel.collection.name,
                localField: 'policyId',
                foreignField: '_id',
                as: 'policies',
              },
            },
            {
              $unwind: '$policies',
            },
            {
              $project: {
                policyId: '$policies._id',
                name: '$policies.name',
                attributes: '$policies.attributes',
              },
            },
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ],
          total: [
            {
              $match: {
                attachmentType: SecurityPolicyAttachmentType.User,
                attachedToId: userId,
              },
            },
            { $count: 'count' },
          ],
        })
        .exec()
    ).at(0);

    return {
      items: aggregationResult.policies.map((policy) => ({
        _id: policy.policyId,
        name: policy.name,
        attributes: policy.attributes,
      })),
      skip: skip,
      limit: limit,
      total: aggregationResult.total.at(0).count,
    };
  }

  async findByIdWithStatistics(policyId: string): Promise<
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

  async findByIdWithStatisticsOrThrow(policyId: string): Promise<
    SecurityPolicyDocument & {
      principals: {
        total: number;
        users: number;
        groups: number;
      };
    }
  > {
    const policyWithStatistics = await this.findByIdWithStatistics(policyId);
    if (!policyWithStatistics) {
      throw new NotFoundException();
    }
    return policyWithStatistics;
  }

  async findById(policyId: string): Promise<SecurityPolicyDocument | null> {
    return this.securityPolicyModel.findById(policyId).exec();
  }

  async findByIdOrThrow(policyId: string): Promise<SecurityPolicy> {
    const securityPolicyDocument = this.findById(policyId);
    if (!securityPolicyDocument) {
      throw new NotFoundException();
    }
    return securityPolicyDocument;
  }

  async findManyByIds(policyIds: string[]): Promise<SecurityPolicy[]> {
    return this.securityPolicyModel
      .find({
        _id: {
          $in: policyIds,
        },
      })
      .exec();
  }

  async setName(
    policyId: string,
    name: string,
  ): Promise<SecurityPolicyDocument | null> {
    return await this.securityPolicyModel.findOneAndUpdate(
      {
        _id: policyId,
      },
      { name: name },
      { new: true },
    );
  }

  async setNameOrThrow(
    policyId: string,
    name: string,
  ): Promise<SecurityPolicyDocument> {
    const securityPolicyDocument = await this.setName(policyId, name);
    if (!securityPolicyDocument) {
      throw new NotFoundException();
    }
    return securityPolicyDocument;
  }

  async setAttributes(
    policyId: string,
    attributes: string[],
  ): Promise<SecurityPolicyDocument | null> {
    const attributesWithoutDiplicates = [...new Set(attributes).values()];
    return await this.securityPolicyModel
      .findOneAndUpdate(
        {
          _id: policyId,
        },
        {
          attributes: attributesWithoutDiplicates,
        },
        { new: true },
      )
      .exec();
  }

  async setAttributesOrThrow(
    policyId: string,
    attributes: string[],
  ): Promise<SecurityPolicyDocument> {
    const securityPolicyDocument = await this.setAttributes(
      policyId,
      attributes,
    );
    if (!securityPolicyDocument) {
      throw new NotFoundException();
    }
    return securityPolicyDocument;
  }

  async addAttributes(
    policyId: string,
    attributes: string[],
  ): Promise<SecurityPolicyDocument | null> {
    return this.securityPolicyModel
      .findOneAndUpdate(
        { _id: policyId },
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

  async addAttributesOrThrow(policyId: string, attributes: string[]) {
    const securityPolicyDocument = this.addAttributes(policyId, attributes);
    if (!securityPolicyDocument) {
      throw new NotFoundException();
    }
    return securityPolicyDocument;
  }

  async removeAttributes(
    policyId: string,
    attributes: string[],
  ): Promise<SecurityPolicyDocument | null> {
    return this.securityPolicyModel
      .findOneAndUpdate(
        {
          _id: policyId,
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

  async removeAttributesFromOrThrow(
    policyId: string,
    attributes: string[],
  ): Promise<SecurityPolicyDocument> {
    const securityPolicyDocument = this.removeAttributes(policyId, attributes);
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
