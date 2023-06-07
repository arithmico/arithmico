import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../../schemas/messege/messege.schema';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create({
    channel,
    createdAt,
    subject,
    text,
    type,
    replyTo,
    emailRef,
  }: Omit<Message, '_id'>): Promise<MessageDocument> {
    return this.messageModel.create({
      channel,
      createdAt,
      subject,
      text,
      type,
      replyTo,
      emailRef,
    });
  }
}
