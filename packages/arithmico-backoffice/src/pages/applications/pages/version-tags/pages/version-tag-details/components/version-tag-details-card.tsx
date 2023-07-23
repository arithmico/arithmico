import { FormattedMessage } from "react-intl";
import { Card } from "../../../../../../../components/card/card";
import { DefinitionListEntry } from "../../../../../../../components/definition-list-entry/definition-list-entry";
import { DefinitionList } from "../../../../../../../components/definition-list/definition-list";
import Heading from "../../../../../../../components/heading/heading";
import { SemanticVersion } from "../../../../../../../components/semantic-version/semantic-version";
import { VersionTagDto } from "../../../../../../../store/api/resources/version-tags/version-tags.types";

export interface VersionTagDetailsCardProps {
  versionTag: VersionTagDto;
}

export function VersionTagDetailsCard({
  versionTag,
}: VersionTagDetailsCardProps) {
  return (
    <Card>
      <Heading level={2} className="mb-4">
        Details
      </Heading>
      <DefinitionList>
        <DefinitionListEntry
          label={<FormattedMessage id="applications.version-tags.id" />}
          value={versionTag.id}
        />
        <DefinitionListEntry
          label={<FormattedMessage id="applications.version-tags.version" />}
          value={<SemanticVersion version={versionTag.version} />}
        />
        <DefinitionListEntry
          label={
            <FormattedMessage id="applications.version-tags.configurable" />
          }
          value={
            versionTag.configurable ? (
              <FormattedMessage id="common.yes" />
            ) : (
              <FormattedMessage id="common.no" />
            )
          }
        />
      </DefinitionList>
    </Card>
  );
}
