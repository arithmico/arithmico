import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';
import {
  SemanticVersion,
  SemanticVersionSchema,
} from '../sematic-version/semantic-version.schema';

export enum FeatureFlagType {
  Constant = 'constant',
  Function = 'function',
  Method = 'method',
}

@Schema()
export class FeatureFlag {
  @Prop({ type: String, default: () => nanoid() })
  _id?: string;

  @Prop({
    required: true,
    type: String,
    enum: [
      FeatureFlagType.Constant,
      FeatureFlagType.Function,
      FeatureFlagType.Method,
    ],
  })
  type: FeatureFlagType;

  @Prop({ required: true, type: SemanticVersionSchema })
  enabledSince: SemanticVersion;

  @Prop({ required: false, type: SemanticVersionSchema })
  disabledSince?: SemanticVersion;

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

FeatureFlagSchema.index({
  name: 1,
});

FeatureFlagSchema.index(
  {
    flag: 1,
  },
  { unique: true },
);

FeatureFlagSchema.index({
  'enabledSince.major': -1,
  'enabledSince.minor': -1,
  'enabledSince.patch': -1,
});

FeatureFlagSchema.index({
  'disabledSince.major': -1,
  'disabledSince.minor': -1,
  'disabledSince.patch': -1,
});
