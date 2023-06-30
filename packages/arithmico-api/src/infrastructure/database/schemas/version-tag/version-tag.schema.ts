import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
}

export const VersionTagSchema = SchemaFactory.createForClass(VersionTag);
