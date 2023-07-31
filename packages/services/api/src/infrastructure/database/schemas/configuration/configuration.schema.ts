import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';

@Schema()
export class Configuration {
  @Prop({ type: String, default: () => nanoid() })
  _id?: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Boolean, required: true })
  autoBuild: boolean;
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);
export type ConfigurationDocument = HydratedDocument<Configuration>;

ConfigurationSchema.index(
  {
    name: 1,
  },
  { unique: true },
);
