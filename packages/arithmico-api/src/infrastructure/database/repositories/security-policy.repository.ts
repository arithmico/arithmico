import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getPolicies(
    skip: number,
    limit: number,
  ): Promise<PagedResponse<SecurityPolicyDocument>> {
    return {
      items: await this.securityPolicyModel
        .find()
        .sort({ name: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      skip,
      limit,
      total: await this.securityPolicyModel.estimatedDocumentCount(),
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
    this.securityPolicyAttachmentModel
      .deleteOne({
        policyId,
        attachmentType: SecurityPolicyAttachmentType.User,
        attachedToId: userId,
      })
      .exec();
  }

  async detachFromGroup(policyId: string, groupId: string): Promise<void> {
    this.securityPolicyAttachmentModel
      .deleteOne({
        policyId,
        attachmentType: SecurityPolicyAttachmentType.Group,
        attachedToId: groupId,
      })
      .exec();
  }
}
