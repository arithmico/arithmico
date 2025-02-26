import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserGroupMembership,
  UserGroupMembershipDocument,
} from '../../schemas/user-group-membership/user-group-membership.schema';
import {
  UserGroup,
  UserGroupDocument,
} from '../../schemas/user-group/user-group.schema';
import { User, UserDocument } from '../../schemas/user/user.schema';

@Injectable()
export class UserGroupMembershipRepository {
  constructor(
    @InjectModel(UserGroup.name)
    private userGroupModel: Model<UserGroupDocument>,
    @InjectModel(UserGroupMembership.name)
    private userGroupMembershipModel: Model<UserGroupMembershipDocument>,
    @InjectModel(User.name)
    private userModal: Model<UserDocument>,
  ) { }

  private async assertUserAndGroupExist(
    groupId: string,
    userId: string,
  ): Promise<void> {
    const [groupExists, userExists] = await Promise.all([
      this.userGroupModel
        .exists({ _id: groupId })
        .exec()
        .then((value) => !!value),
      this.userModal
        .exists({ _id: userId })
        .exec()
        .then((value) => !!value),
    ]);

    if (!groupExists || !userExists) {
      throw new NotFoundException();
    }
  }

  async addUserToUserGroup(
    groupId: string,
    userId: string,
  ): Promise<UserGroupMembershipDocument> {
    await this.assertUserAndGroupExist(groupId, userId);

    const membership: UserGroupMembership = {
      groupId,
      userId,
    };

    return await this.userGroupMembershipModel.findOneAndUpdate(
      membership,
      membership,
      { new: true, upsert: true },
    );
  }

  async removeUserFromUserGroup(
    groupId: string,
    userId: string,
  ): Promise<UserGroupMembershipDocument | null> {
    const result = await this.userGroupMembershipModel
      .findOneAndDelete({ groupId, userId })
      .exec();

    return result;
  }

  async removeUserFromUserGroupOrThrow(
    groupId: string,
    userId: string,
  ): Promise<UserGroupMembershipDocument> {
    const userGroupMembershipDocument = await this.removeUserFromUserGroup(
      groupId,
      userId,
    );
    if (!userGroupMembershipDocument) {
      throw new NotFoundException();
    }
    return userGroupMembershipDocument;
  }
}
