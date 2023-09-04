import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';
import {
  PlatformBuildJob,
  PlatformBuildJobSchema,
} from './platform-build-job.schema';

@Schema()
export class BuildJob {
  @Prop({ type: String, default: () => nanoid() })
  _id?: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: String, required: true })
  configurationId: string;

  @Prop({ type: String, required: true })
  configurationRevisionId: string;

  @Prop({ type: String, required: true })
  versionTagId: string;

  @Prop({ type: [PlatformBuildJobSchema], required: true })
  platforms: PlatformBuildJob[];

  @Prop({ type: String, required: true })
  webhookToken: string;
}

export const BuildJobSchema = SchemaFactory.createForClass(BuildJob);
export type BuildJobDocument = HydratedDocument<BuildJob>;

BuildJobSchema.index(
  {
    configurationId: 1,
    configurationRevisionId: 1,
    versionTagId: 1,
  },
  { unique: true },
);

BuildJobSchema.index({
  configurationId: 1,
  configurationRevisionId: 1,
});

BuildJobSchema.index({
  configurationId: 1,
});
