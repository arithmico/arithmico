import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';

@Schema({ autoIndex: true })
export class UserGroup {
  @Prop({ type: String, default: () => nanoid() })
  _id?: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: Boolean, required: true })
  readonly: boolean;
}

export type UserGroupDocument = HydratedDocument<UserGroup>;
export const UserGroupSchema = SchemaFactory.createForClass(UserGroup);

UserGroupSchema.index(
  {
    name: 1,
  },
  { unique: true },
);
