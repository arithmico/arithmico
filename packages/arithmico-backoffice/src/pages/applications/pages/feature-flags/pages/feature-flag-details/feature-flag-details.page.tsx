import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { Card } from "../../../../../../components/card/card";
import { DefinitionListEntry } from "../../../../../../components/definition-list-entry/definition-list-entry";
import { DefinitionList } from "../../../../../../components/definition-list/definition-list";
import Heading from "../../../../../../components/heading/heading";
import { SemanticVersion } from "../../../../../../components/semantic-version/semantic-version";
import { EditIcon } from "../../../../../../icons/edit.icon";
import { useGetFeatureFlagByIdQuery } from "../../../../../../store/api/resources/feature-flags/feature-flags.api";
import { EditFeatureFlagDialog } from "./compontents/edit-feature-flag.dialog";
import { SupportedVersionTagsForFeatureFlagList } from "./compontents/supported-version-tags-for-feature-flag-list";

export function FeatureFlagDetailsPage() {
  const { flagId } = useParams();
  const { isSuccess, data } = useGetFeatureFlagByIdQuery({ flagId: flagId! });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <EditFeatureFlagDialog
        flagId={flagId!}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      {isSuccess && (
        <>
          <div className="my-4 flex">
            <Heading level={1}>{data.name}</Heading>
            <button className="ml-auto" onClick={() => setIsDialogOpen(true)}>
              <EditIcon className={"h-6 w-6"} />
              <span className="sr-only">Bearbeiten</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-start-2 row-start-1 flex flex-col">
              <Card>
                <Heading level={2} className="mb-4">
                  <FormattedMessage id="applications.feature-flags.details-card" />
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
                      <FormattedMessage id="applications.feature-flags.enabled-since-version" />
                    }
                    value={
                      <SemanticVersion version={data.enabledSinceVersion} />
                    }
                  />
                  <DefinitionListEntry
                    label={
                      <FormattedMessage id="applications.feature-flags.disabled-since-version" />
                    }
                    value={
                      <SemanticVersion version={data.disabledSinceVersion} />
                    }
                  />
                </DefinitionList>
              </Card>
            </div>
            <div className="col-start-1 row-start-1 flex flex-col">
              <SupportedVersionTagsForFeatureFlagList flagId={flagId!} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
