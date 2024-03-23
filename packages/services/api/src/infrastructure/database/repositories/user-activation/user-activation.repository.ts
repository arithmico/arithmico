import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserActivation,
  UserActivationDocument,
} from '../../schemas/user-activation/user-activation.schema';

@Injectable()
export class UserActivationRepository {
  constructor(
    @InjectModel(UserActivation.name)
    private userActivationModel: Model<UserActivation>,
  ) {}

  async create(userId: string): Promise<UserActivationDocument> {
    const userActivation: UserActivation = {
      userId,
      createdAt: new Date(),
    };

    return await this.userActivationModel.create(userActivation);
  }

  async findAndDelete(activationId: string): Promise<UserActivationDocument> {
    const result = await this.userActivationModel
      .findOneAndDelete({
        _id: activationId,
      })
      .exec();

    if (!result.ok) {
      throw new NotFoundException();
    }

    return result.value;
  }
}
