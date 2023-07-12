import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum SecurityPolicyAttachmentType {
  User = 'user',
  Group = 'group',
}

@Schema()
export class SecurityPolicyAttachment {
  @Prop({ type: String, required: true })
  policyId: string;

  @Prop({
    type: String,
    enum: [
      SecurityPolicyAttachmentType.User,
      SecurityPolicyAttachmentType.Group,
    ],
    required: true,
  })
  attachmentType: SecurityPolicyAttachmentType;

  @Prop({ type: String, required: true })
  attachedToId: string;
}

export type SecurityPolicyAttachmentDocument =
  HydratedDocument<SecurityPolicyAttachment>;
export const SecurityPolicyAttachmentSchema = SchemaFactory.createForClass(
  SecurityPolicyAttachment,
);

SecurityPolicyAttachmentSchema.index({
  policyId: 1,
});

SecurityPolicyAttachmentSchema.index({
  policyId: 1,
  attachmentType: 1,
});

SecurityPolicyAttachmentSchema.index({
  attachedToId: 1,
  attachmentType: 1,
});

SecurityPolicyAttachmentSchema.index(
  {
    policyId: 1,
    attachmentType: 1,
    attachedToId: 1,
  },
  { unique: true },
);
