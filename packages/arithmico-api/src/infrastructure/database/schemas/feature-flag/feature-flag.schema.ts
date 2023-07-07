import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';

export enum FeatureFlagType {
  Constant = 'constant',
  Function = 'function',
  Method = 'method',
  Operator = 'operator',
  Type = 'type',
}

@Schema()
export class FeatureFlag {
  @Prop({ type: String, default: () => nanoid() })
  _id?: string;

  @Prop({
    required: true,
    type: String,
    enum: FeatureFlagType,
  })
  type: FeatureFlagType;

  @Prop({ required: true, type: String })
  enabledSinceVersionTagId: string;

  @Prop({ required: false, type: String })
  disabledSinceVersionTagId?: string;

  @Prop({ required: true, type: String })
  flag: string;

  @Prop({ required: true, type: String })
  name: string;
}

export const FeatureFlagSchema = SchemaFactory.createForClass(FeatureFlag);
export type FeatureFlagDocument = HydratedDocument<FeatureFlag>;

FeatureFlagSchema.index({
  type: 1,
});

FeatureFlagSchema.index(
  {
    name: 1,
  },
  { unique: true },
);

FeatureFlagSchema.index(
  {
    flag: 1,
  },
  { unique: true },
);
