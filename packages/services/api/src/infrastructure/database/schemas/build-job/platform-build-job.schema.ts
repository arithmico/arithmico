import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum BuildJobArtifactPlatform {
  Windows = 'windows',
  Linux = 'linux',
  Macos = 'macos',
}

export enum BuildJobArtifactStatus {
  Created = 'created',
  Queued = 'queued',
  Running = 'running',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

@Schema({ _id: false })
export class PlatformBuildJob {
  @Prop({ type: String, required: true, enum: BuildJobArtifactStatus })
  status: BuildJobArtifactStatus;

  @Prop({ type: String, required: true })
  artifactUrl: string;

  @Prop({ type: String, required: true, enum: BuildJobArtifactPlatform })
  platform: BuildJobArtifactPlatform;
}

export const PlatformBuildJobSchema =
  SchemaFactory.createForClass(PlatformBuildJob);
