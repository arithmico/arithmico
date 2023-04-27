import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';

@Schema()
export class Message {
  @Prop({ type: String, default: () => nanoid() })
  _id?: string;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: String, required: true })
  channel: string;

  @Prop({ type: String, required: true })
  subject: string;

  @Prop({ type: String, required: true, enum: ['internal', 'external'] })
  type: 'internal' | 'external';

  @Prop({ type: String, required: false })
  replyTo?: string;

  @Prop({ type: String, required: false })
  emailRef?: string;

  @Prop({ type: String, required: true })
  text: string;
}

export type MessageDocument = HydratedDocument<Message>;
export const MessageSchema = SchemaFactory.createForClass(Message);

MessageSchema.index({
  createdAt: 1,
});
