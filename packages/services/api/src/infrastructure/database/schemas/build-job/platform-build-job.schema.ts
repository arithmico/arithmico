import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum PlatformBuildJobPlatform {
  Windows = 'windows',
  Linux = 'linux',
  Macos = 'macos',
}

export enum PlatformBuildJobStatus {
  Running = 'running',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

@Schema({ _id: false })
export class PlatformBuildJob {
  @Prop({ type: String, required: true, enum: PlatformBuildJobStatus })
  status: PlatformBuildJobStatus;

  @Prop({ type: String, required: false })
  artifactUrl?: string;

  @Prop({ type: String, required: true, enum: PlatformBuildJobPlatform })
  platform: PlatformBuildJobPlatform;
}

export const PlatformBuildJobSchema =
  SchemaFactory.createForClass(PlatformBuildJob);
