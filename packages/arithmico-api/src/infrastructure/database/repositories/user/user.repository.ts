import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import {
  SecurityPolicyAttachment,
  SecurityPolicyAttachmentDocument,
} from '../../schemas/security-policy-attachment/security-policy-attachment.schema';
import {
  UserGroupMembership,
  UserGroupMembershipDocument,
} from '../../schemas/user-group-membership/user-group-membership.schema';
import { User, UserDocument } from '../../schemas/user/user.schema';
import { CreateUserArgs, GetUsersArgs } from './user.repository.types';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserGroupMembership.name)
    private userGroupMembershipModel: Model<UserGroupMembershipDocument>,
    @InjectModel(SecurityPolicyAttachment.name)
    private securityPolicyAttachmentModel: Model<SecurityPolicyAttachmentDocument>,
  ) {}

  async create({ username, email }: CreateUserArgs): Promise<UserDocument> {
    const newUser: User = {
      createdAt: new Date(),
      username,
      email,
      activated: false,
    };

    return this.userModel.create(newUser);
  }

  async getByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async getUserById(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId);
  }

  async getUserByIdOrThrow(userId: string): Promise<UserDocument> {
    const userDocument = await this.getUserById(userId);
    if (!userDocument) {
      throw new NotFoundException();
    }
    return userDocument;
  }

  async getUsers({ skip, limit }: GetUsersArgs): Promise<
    PagedResponse<
      UserDocument & {
        userGroups: number;
        securityPolicies: number;
      }
    >
  > {
    const result = await this.userModel
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
              as: 'securityPolicies',
            },
          },
          {
            $lookup: {
              from: this.userGroupMembershipModel.collection.name,
              localField: '_id',
              foreignField: 'userId',
              as: 'userGroups',
            },
          },
          {
            $addFields: {
              securityPolicies: { $size: '$securityPolicies' },
              userGroups: { $size: '$userGroups' },
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
      total: result.at(0).total,
      skip,
      limit,
    };
  }

  async hasUsers(): Promise<boolean> {
    const result = await this.userModel.estimatedDocumentCount();
    return result !== 0;
  }

  async setPasswordHash(
    userId: string,
    passwordHash: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findOneAndUpdate(
        {
          _id: userId,
        },
        { passwordHash },
        { new: true },
      )
      .exec();
  }

  async setPasswordHashOrThrow(
    userId: string,
    passwordHash: string,
  ): Promise<UserDocument> {
    const userDocument = await this.setPasswordHash(userId, passwordHash);
    if (!userDocument) {
      throw new NotFoundException();
    }
    return userDocument;
  }

  async activateUser(userId: string): Promise<UserDocument | null> {
    return this.userModel.findOneAndUpdate(
      { _id: userId },
      { activated: true },
      { new: true },
    );
  }

  async activateUserOrThrow(userId: string): Promise<UserDocument> {
    const userDocument = await this.activateUser(userId);
    if (!userDocument) {
      throw new NotFoundException();
    }
    return userDocument;
  }

  async getUserByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async getUserByUsernameOrThrow(username: string): Promise<UserDocument> {
    const userDocument = await this.getUserByUsername(username);
    if (!userDocument) {
      throw new NotFoundException();
    }
    return userDocument;
  }

  async getUsersForUserGroup(
    groupId: string,
    skip: number,
    limit: number,
  ): Promise<PagedResponse<UserDocument>> {
    const result = await this.userGroupMembershipModel
      .aggregate()
      .match({ groupId })
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
              from: this.userModel.collection.name,
              localField: 'userId',
              foreignField: '_id',
              as: 'userDocument',
            },
          },
          {
            $unwind: '$userDocument',
          },
          {
            $replaceRoot: {
              newRoot: '$userDocument',
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
      total: result.at(0).total,
      skip,
      limit,
    };
  }
}
