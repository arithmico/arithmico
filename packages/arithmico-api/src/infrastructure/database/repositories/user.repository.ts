import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PagedResponse } from '../../../common/types/paged-response.dto';
import { User, UserDocument } from '../schemas/user/user.schema';
import { CreateUserArgs, GetUsersArgs } from './user.repository.types';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create({ username, email }: CreateUserArgs): Promise<UserDocument> {
    const newUser: User = {
      username,
      email,
      activated: false,
    };

    return this.userModel.create(newUser);
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

  async getUsers({
    skip,
    limit,
  }: GetUsersArgs): Promise<PagedResponse<UserDocument>> {
    const items = await this.userModel.find().skip(skip).limit(limit).exec();
    const total = await this.userModel.find().countDocuments().exec();
    return {
      items,
      skip,
      limit,
      total,
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
}
