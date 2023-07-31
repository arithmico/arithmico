import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import {
  UserGroup,
  UserGroupDocument,
} from '../../schemas/user-group/user-group.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  UserGroupMembership,
  UserGroupMembershipDocument,
} from '../../schemas/user-group-membership/user-group-membership.schema';
import {
  SecurityPolicyAttachment,
  SecurityPolicyAttachmentDocument,
  SecurityPolicyAttachmentType,
} from '../../schemas/security-policy-attachment/security-policy-attachment.schema';

export class UserGroupRepository {
  constructor(
    @InjectModel(UserGroup.name)
    private userGroupModel: Model<UserGroupDocument>,
    @InjectModel(UserGroupMembership.name)
    private userGroupMembershipModel: Model<UserGroupMembershipDocument>,
    @InjectModel(SecurityPolicyAttachment.name)
    private securityPolicyAttachmentModel: Model<SecurityPolicyAttachmentDocument>,
  ) {}

  async createUserGroup(
    name: string,
    readonly: boolean,
  ): Promise<UserGroupDocument> {
    const newUserGroup: UserGroup = {
      createdAt: new Date(),
      name,
      readonly,
    };
    return this.userGroupModel.create(newUserGroup);
  }

  async renameUserGroup(
    groupId: string,
    name: string,
  ): Promise<UserGroupDocument | null> {
    return await this.userGroupModel.findOneAndUpdate(
      {
        _id: groupId,
        readonly: false,
      },
      { name: name },
      { new: true },
    );
  }

  async renameUserGroupOrThrow(
    groupId: string,
    name: string,
  ): Promise<UserGroupDocument> {
    const userGroupDocument = await this.renameUserGroup(groupId, name);
    if (!userGroupDocument) {
      throw new NotFoundException();
    }
    return userGroupDocument;
  }

  async deleteUserGroup(groupId: string): Promise<void> {
    const hasMembers =
      (await this.userGroupMembershipModel
        .find({
          groupId: groupId,
        })
        .count()
        .exec()) > 0;

    if (hasMembers) {
      throw new BadRequestException();
    }

    const result = await this.userGroupModel
      .deleteOne({
        _id: groupId,
        readonly: false,
      })
      .exec();

    if (result.deletedCount < 1) {
      throw new NotFoundException();
    }
  }

  async getUserGroupByIdWithDetails(groupId: string): Promise<
    | (UserGroupDocument & {
        members: number;
      })
    | null
  > {
    return (
      await this.userGroupModel
        .aggregate()
        .match({ _id: groupId })
        .lookup({
          from: this.userGroupMembershipModel.collection.name,
          localField: '_id',
          foreignField: 'groupId',
          as: 'members',
        })
        .addFields({
          members: { $size: '$members' },
        })
        .exec()
    ).at(0);
  }

  async getUserGroupByIdWithDetailsOrThrow(groupId: string): Promise<
    UserGroupDocument & {
      members: number;
    }
  > {
    const userGroupDocumentWithDetails = await this.getUserGroupByIdWithDetails(
      groupId,
    );
    if (!userGroupDocumentWithDetails) {
      throw new NotFoundException();
    }
    return userGroupDocumentWithDetails;
  }

  async getUserGroupsForUser(
    skip: number,
    limit: number,
    userId: string,
  ): Promise<PagedResponse<UserGroupDocument>> {
    const result = await this.userGroupMembershipModel
      .aggregate()
      .match({ userId })
      .facet({
        items: [
          { $skip: skip },
          { $limit: limit },
          {
            $lookup: {
              from: this.userGroupModel.collection.name,
              localField: 'groupId',
              foreignField: '_id',
              as: 'group',
            },
          },
          { $unwind: '$group' },
          { $replaceRoot: { newRoot: '$group' } },
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
      skip,
      limit,
      total: result.at(0).total,
      items: result.at(0).items,
    };
  }

  async getUserGroups(
    skip: number,
    limit: number,
  ): Promise<PagedResponse<UserGroupDocument & { members: number }>> {
    const result = await this.userGroupModel
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
              from: this.userGroupMembershipModel.collection.name,
              localField: '_id',
              foreignField: 'groupId',
              as: 'members',
            },
          },
          {
            $addFields: {
              members: { $size: '$members' },
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
      skip,
      limit,
      total: result.at(0).total,
      items: result.at(0).items,
    };
  }

  async getUserGroupsWithIsMemberCheck(
    skip: number,
    limit: number,
    userId: string,
  ): Promise<PagedResponse<UserGroupDocument & { isMember: boolean }>> {
    const result = await this.userGroupModel
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
              from: this.userGroupMembershipModel.collection.name,
              localField: '_id',
              foreignField: 'groupId',
              as: 'isMember',
            },
          },
          {
            $addFields: {
              isMember: {
                $filter: {
                  input: '$isMember',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.userId', userId],
                  },
                },
              },
            },
          },
          {
            $addFields: {
              isMember: { $gte: [{ $size: '$isMember' }, 1] },
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
      skip,
      limit,
      total: result.at(0).total,
      items: result.at(0).items,
    };
  }

  async getUsersGroupsForSecurityPolicy(
    skip: number,
    limit: number,
    policyId: string,
  ): Promise<PagedResponse<UserGroupDocument>> {
    const result = await this.securityPolicyAttachmentModel
      .aggregate()
      .match({
        policyId,
        attachmentType: SecurityPolicyAttachmentType.Group,
      })
      .facet({
        items: [
          { $match: {} },
          { $skip: skip },
          { $limit: limit },
          {
            $lookup: {
              from: this.userGroupModel.collection.name,
              localField: 'attachedToId',
              foreignField: '_id',
              as: 'userGroup',
            },
          },
          { $unwind: '$userGroup' },
          { $replaceRoot: { newRoot: '$userGroup' } },
        ],
        total: [{ $count: 'count' }],
      })
      .project({
        items: 1,
        total: { $arrayElemAt: ['$total.count', 0] },
      })
      .exec();

    return {
      skip,
      limit,
      total: result.at(0).total,
      items: result.at(0).items,
    };
  }

  async getUserGroupsWithAttachmentCheck(
    skip: number,
    limit: number,
    policyId: string,
  ): Promise<PagedResponse<UserGroupDocument & { isAttached: boolean }>> {
    const result = await this.userGroupModel
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
              foreignField: 'attachedToId',
              as: 'isAttached',
            },
          },
          {
            $addFields: {
              isAttached: {
                $filter: {
                  input: '$isAttached',
                  as: 'item',
                  cond: {
                    $and: [
                      { $eq: ['$$item.policyId', policyId] },
                      {
                        $eq: [
                          '$$item.attachmentType',
                          SecurityPolicyAttachmentType.Group,
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
          {
            $addFields: {
              isAttached: { $gte: [{ $size: '$isAttached' }, 1] },
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
      skip,
      limit,
      total: result.at(0).total,
      items: result.at(0).items,
    };
  }
}
