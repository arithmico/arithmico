import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class SemanticVersion {
  @Prop({ required: true, type: Number })
  major: number;

  @Prop({ required: true, type: Number })
  minor: number;

  @Prop({ required: true, type: Number })
  patch: number;
}

export const SemanticVersionSchema =
  SchemaFactory.createForClass(SemanticVersion);
