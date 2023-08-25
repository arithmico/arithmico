import { Prop, Schema } from '@nestjs/mongoose';
import { nanoid } from 'nanoid';
import {
  BuildJobArtifact,
  BuildJobArtifactSchema,
} from './build-job-artifact.schema';

export enum BuildJobStatus {
  Created = 'created',
  Queued = 'queued',
  Running = 'running',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

@Schema()
export class BuildJob {
  @Prop({ type: String, default: () => nanoid() })
  _id?: string;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: String, required: true })
  configurationId: string;

  @Prop({ type: String, required: true })
  configurationRevisionId: string;

  @Prop({ type: String, required: true, enum: BuildJobStatus })
  status: BuildJobStatus;

  @Prop({ type: [BuildJobArtifactSchema], required: true })
  artifacts: BuildJobArtifact[];
}
