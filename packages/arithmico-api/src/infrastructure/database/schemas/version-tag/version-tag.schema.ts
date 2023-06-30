import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';
import {
  SemanticVersion,
  SemanticVersionSchema,
} from '../sematic-version/semantic-version.schema';

@Schema()
export class VersionTag {
  @Prop({ type: String, default: () => nanoid() })
  _id?: string;

  @Prop({ required: true, type: [SemanticVersionSchema] })
  version: SemanticVersion;

  @Prop({ required: true, type: String })
  commit: string;
}

export const VersionTagSchema = SchemaFactory.createForClass(VersionTag);
export type VersionTagDocument = HydratedDocument<VersionTag>;

VersionTagSchema.index(
  {
    commit: 1,
  },
  { unique: true },
);

VersionTagSchema.index({
  'version.major': -1,
  'version.minor': -1,
  'version.patch': -1,
});
