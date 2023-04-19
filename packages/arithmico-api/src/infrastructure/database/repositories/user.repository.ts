import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserArgs } from './user.repository.types';

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
}
