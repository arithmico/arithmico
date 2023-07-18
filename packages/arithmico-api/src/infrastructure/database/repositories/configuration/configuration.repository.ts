import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ConfigurationRevisionFeatureFlagAssociation,
  ConfigurationRevisionFeatureFlagAssociationDocument,
} from '../../schemas/configuration-revision-feature-flag-association/configuration-revision-feature-flag-association';
import {
  ConfigurationRevision,
  ConfigurationRevisionDocument,
} from '../../schemas/configuration-revision/configuration-revision.schema';
import {
  Configuration,
  ConfigurationDocument,
} from '../../schemas/configuration/configuration.schema';

@Injectable()
export class ConfigurationRepository {
  constructor(
    @InjectModel(Configuration.name)
    private readonly configurationModel: Model<ConfigurationDocument>,
    @InjectModel(ConfigurationRevision.name)
    private readonly revisionModel: Model<ConfigurationRevisionDocument>,
    @InjectModel(ConfigurationRevisionFeatureFlagAssociation.name)
    private readonly featureFlagAssociationModel: Model<ConfigurationRevisionFeatureFlagAssociationDocument>,
  ) {}

  async createConfiguration(
    name: string,
    autoBuild: boolean,
  ): Promise<ConfigurationDocument> {
    const configuration: Configuration = {
      name,
      autoBuild,
    };
    const document = await this.configurationModel.create(configuration);
    return document;
  }

  async createConfigurationRevision(
    configurationId: string,
    revision: number,
    featureFlagIds: string[],
  ): Promise<ConfigurationRevisionDocument> {
    const configurationRevision: ConfigurationRevision = {
      configurationId,
      revision,
    };
    const revisionDocument = await this.revisionModel.create(
      configurationRevision,
    );
    await Promise.all(
      featureFlagIds.map((featureFlagId) =>
        this.associateFeatureFlagWithConfigurationRevision(
          revisionDocument._id,
          featureFlagId,
        ),
      ),
    );
    return revisionDocument;
  }

  async associateFeatureFlagWithConfigurationRevision(
    configurationRevisionId: string,
    featureFlagId: string,
  ): Promise<ConfigurationRevisionFeatureFlagAssociationDocument> {
    const association: ConfigurationRevisionFeatureFlagAssociation = {
      configurationRevisionId,
      featureFlagId,
    };
    return this.featureFlagAssociationModel.create(association);
  }
}
