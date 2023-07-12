import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';

@Schema({ autoIndex: true })
export class User {
  @Prop({ type: String, default: () => nanoid() })
  _id?: string;

  @Prop({ type: Boolean, required: true })
  activated: boolean;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: false })
  passwordHash?: string;

  @Prop({ type: Date, required: true })
  createdAt: Date;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index(
  {
    username: 1,
  },
  { unique: true },
);

UserSchema.index({
  email: 1,
});

UserSchema.index({
  createdAt: 1,
});

UserSchema.index({
  username: 'text',
  email: 'text',
});
