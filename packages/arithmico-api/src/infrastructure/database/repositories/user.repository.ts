import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PagedResponse } from '../../../common/types/paged-response.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserArgs, GetUsersArgs } from './user.repository.types';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create({ username, email }: CreateUserArgs): Promise<UserDocument> {
    const newUser: User = {
      username,
      email,
    };

    return this.userModel.create(newUser);
  }

  async getUsers({
    skip,
    limit,
  }: GetUsersArgs): Promise<PagedResponse<UserDocument>> {
    const items = await this.userModel.find().skip(skip).limit(limit).exec();
    const total = await this.userModel.find().count().exec();
    return {
      items,
      skip,
      limit,
      total,
    };
  }
}
