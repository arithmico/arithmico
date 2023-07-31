import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class ConfigurationRevisionFeatureFlagAssociation {
  @Prop({ type: String, required: true })
  featureFlagId: string;

  @Prop({ type: String, required: true })
  configurationRevisionId: string;
}

export const ConfigurationRevisionFeatureFlagAssociationSchema =
  SchemaFactory.createForClass(ConfigurationRevisionFeatureFlagAssociation);
export type ConfigurationRevisionFeatureFlagAssociationDocument =
  HydratedDocument<ConfigurationRevisionFeatureFlagAssociation>;

ConfigurationRevisionFeatureFlagAssociationSchema.index({
  featureFlagId: 1,
});

ConfigurationRevisionFeatureFlagAssociationSchema.index({
  configurationId: 1,
});

ConfigurationRevisionFeatureFlagAssociationSchema.index(
  {
    featureFlagId: 1,
    configurationRevisionId: 1,
  },
  { unique: true },
);
