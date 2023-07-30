import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';

@Schema()
export class UserActivation {
  @Prop({ type: String, default: () => nanoid() })
  _id?: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: Date, required: true })
  createdAt: Date;
}

export type UserActivationDocument = HydratedDocument<UserActivation>;
export const UserActivationSchema =
  SchemaFactory.createForClass(UserActivation);

UserActivationSchema.index(
  {
    userId: 1,
  },
  { unique: true },
);
