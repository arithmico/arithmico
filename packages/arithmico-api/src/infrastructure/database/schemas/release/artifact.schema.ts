import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Artifact {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  url: string;
}

export const ArtifactSchema = SchemaFactory.createForClass(Artifact);
