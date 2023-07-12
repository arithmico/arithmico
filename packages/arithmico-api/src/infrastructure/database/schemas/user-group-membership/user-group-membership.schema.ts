import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class UserGroupMembership {
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  groupId: string;
}

export type UserGroupMembershipDocument = HydratedDocument<UserGroupMembership>;
export const UserGroupMembershipSchema =
  SchemaFactory.createForClass(UserGroupMembership);

UserGroupMembershipSchema.index(
  {
    userId: 1,
    groupId: 1,
  },
  { unique: true },
);

UserGroupMembershipSchema.index({
  userId: 1,
});

UserGroupMembershipSchema.index({
  groupId: 1,
});
