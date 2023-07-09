import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { Card } from "../../../../../../components/card/card";
import { DefinitionListEntry } from "../../../../../../components/definition-list-entry/definition-list-entry";
import { DefinitionList } from "../../../../../../components/definition-list/definition-list";
import Heading from "../../../../../../components/heading/heading";
import { SemanticVersion } from "../../../../../../components/semantic-version/semantic-version";
import { useGetFeatureFlagByIdQuery } from "../../../../../../store/api/resources/feature-flags/feature-flags.api";

export function FeatureFlagDetailsPage() {
  const { flagId } = useParams();
  const { isSuccess, data } = useGetFeatureFlagByIdQuery({ flagId: flagId! });

  return (
    <>
      <div className="my-4">
        <Heading level={1}>Funktion</Heading>
      </div>
      {isSuccess && (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-start-2 flex flex-col">
            <Card>
              <Heading level={2} className="mb-4">
                <FormattedMessage id="versions.feature-flags.details-card" />
              </Heading>
              <DefinitionList>
                <DefinitionListEntry label={"ID"} value={data.id} />
                <DefinitionListEntry label={"Name"} value={data.name} />
                <DefinitionListEntry label={"Flag"} value={data.flag} />
                <DefinitionListEntry
                  label={"Typ"}
                  value={
                    <FormattedMessage
                      id={`versions.feature-flags.type.${data.type}`}
                      defaultMessage={data.type}
                    />
                  }
                />
                <DefinitionListEntry
                  label={
                    <FormattedMessage id="versions.feature-flags.minimum-version" />
                  }
                  value={<SemanticVersion version={data.enabledSinceVersion} />}
                />
                <DefinitionListEntry
                  label={
                    <FormattedMessage id="versions.feature-flags.maximum-version" />
                  }
                  value={
                    <SemanticVersion version={data.disabledSinceVersion} />
                  }
                />
              </DefinitionList>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
