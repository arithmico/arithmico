import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email, EmailDocument } from '../../schemas/email/email.schema';

@Injectable()
export class EmailRepository {
  constructor(
    @InjectModel(Email.name) private emailModel: Model<EmailDocument>,
  ) {}

  async create({ rawEmail }: Omit<Email, '_id'>): Promise<EmailDocument> {
    return this.emailModel.create({
      rawEmail,
    });
  }
}
