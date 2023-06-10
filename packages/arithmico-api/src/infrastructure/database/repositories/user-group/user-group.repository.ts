import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import {
  UserGroup,
  UserGroupDocument,
} from '../../schemas/user-group/user-group.schema';
import { NotFoundException } from '@nestjs/common';
import {
  UserGroupMembership,
  UserGroupMembershipDocument,
} from '../../schemas/user-group-membership/user-group-membership.schema';

export class UserGroupRepository {
  constructor(
    @InjectModel(UserGroup.name)
    private userGroupModel: Model<UserGroupDocument>,
    @InjectModel(UserGroupMembership.name)
    private userGroupMembershipModel: Model<UserGroupMembershipDocument>,
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
              foreignField: 'userId',
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
}
