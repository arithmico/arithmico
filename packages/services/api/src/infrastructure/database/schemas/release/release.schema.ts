import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';
import { Artifact, ArtifactSchema } from './artifact.schema';
import { Version, VersionSchema } from './version.schema';

@Schema()
export class Release {
  @Prop({ type: String, default: () => nanoid() })
  _id?: string;

  @Prop({ type: VersionSchema, required: true })
  version: Version;

  @Prop({ type: [ArtifactSchema], required: true })
  artifacts: Artifact[];

  @Prop({ type: Date, required: true })
  releaseDate: string;

  @Prop({ type: String, required: true })
  description: string;
}

export const ReleaseSchema = SchemaFactory.createForClass(Release);
export type ReleaseDocument = HydratedDocument<Release>;

ReleaseSchema.index(
  {
    'version.majorVersion': 1,
    'version.minorVersion': 1,
    'version.patchVersion': 1,
  },
  { unique: true },
);

ReleaseSchema.index({
  releaseDate: 1,
});
