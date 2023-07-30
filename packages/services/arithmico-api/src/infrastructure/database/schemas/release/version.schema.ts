import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Version {
  @Prop({ type: Number, required: true })
  majorVersion: number;

  @Prop({ type: Number, required: true })
  minorVersion: number;

  @Prop({ type: Number, required: true })
  patchVersion: number;
}

export const VersionSchema = SchemaFactory.createForClass(Version);
