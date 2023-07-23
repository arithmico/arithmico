import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';

@Schema()
export class ConfigurationRevision {
  @Prop({ type: String, default: () => nanoid() })
  _id?: string;

  @Prop({ type: String, required: true })
  configurationId: string;

  @Prop({ type: Number, required: true })
  revision: number;

  @Prop({ type: String, required: true })
  minimumVersionTagId: string;
}

export const ConfigurationRevisionSchema = SchemaFactory.createForClass(
  ConfigurationRevision,
);
export type ConfigurationRevisionDocument =
  HydratedDocument<ConfigurationRevision>;

ConfigurationRevisionSchema.index(
  {
    configurationId: -1,
    revision: -1,
  },
  { unique: true },
);
