import { FormattedMessage } from "react-intl";
import { Card } from "../../../../../../../components/card/card";
import { DefinitionListEntry } from "../../../../../../../components/definition-list-entry/definition-list-entry";
import { DefinitionList } from "../../../../../../../components/definition-list/definition-list";
import Heading from "../../../../../../../components/heading/heading";
import { useGetConfigurationByIdQuery } from "../../../../../../../store/api/resources/configurations/configurations.api";

export interface ConfigurationDetailsCardProps {
  configurationId: string;
}

export function ConfigurationDetailsCard({
  configurationId,
}: ConfigurationDetailsCardProps) {
  const { isSuccess, data } = useGetConfigurationByIdQuery({ configurationId });

  if (!isSuccess) {
    return <></>;
  }

  return (
    <Card>
      <Heading level={2} className="mb-4">
        <FormattedMessage id="applications.configurations.short-details" />
      </Heading>
      <DefinitionList>
        <DefinitionListEntry
          label={<FormattedMessage id="applications.configurations.id" />}
          value={data.id}
        />
        <DefinitionListEntry
          label={<FormattedMessage id="applications.configurations.name" />}
          value={data.name}
        />
        <DefinitionListEntry
          label={
            <FormattedMessage id="applications.configurations.auto-build" />
          }
          value={
            data ? (
              <FormattedMessage id="common.yes" />
            ) : (
              <FormattedMessage id="common.no" />
            )
          }
        />
        <DefinitionListEntry
          label={
            <FormattedMessage id="applications.configurations.revisions" />
          }
          value={data.revisions === 0 ? "-" : data.revisions}
        />
      </DefinitionList>
    </Card>
  );
}
