import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum BuildJobArtifactPlatform {
  Windows = 'windows',
  Linux = 'linux',
  Macos = 'macos',
}

@Schema({ _id: false })
export class BuildJobArtifact {
  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: String, required: true, enum: BuildJobArtifactPlatform })
  platform: BuildJobArtifactPlatform;
}

export const BuildJobArtifactSchema =
  SchemaFactory.createForClass(BuildJobArtifact);
