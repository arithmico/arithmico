import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';

@Schema()
export class SecurityPolicy {
  @Prop({ type: String, default: () => nanoid() })
  _id?: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [String], required: true })
  attributes: string[];
}

export type SecurityPolicyDocument = HydratedDocument<SecurityPolicy>;
export const SecurityPolicySchema =
  SchemaFactory.createForClass(SecurityPolicy);

SecurityPolicySchema.index(
  {
    name: -1,
  },
  { unique: true },
);
