import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { Card } from "../../../../../../../components/card/card";
import Heading from "../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import {
  useGetConfigurationByIdQuery,
  useGetConfigurationRevisionsQuery,
} from "../../../../../../../store/api/resources/configurations/configurations.api";

export interface ConfigurationRevisionsCardProps {
  configurationId: string;
}

export function ConfigurationRevisionsCard({
  configurationId,
}: ConfigurationRevisionsCardProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { isSuccess: configurationIsSuccess, data: configuration } =
    useGetConfigurationByIdQuery({ configurationId });
  const { isSuccess: revisionsIsSuccess, data: revisions } =
    useGetConfigurationRevisionsQuery({
      configurationId,
      skip,
      limit,
    });

  if (!configurationIsSuccess || !revisionsIsSuccess) {
    return <></>;
  }

  return (
    <Card>
      <Heading level={2} className="mb-4">
        <FormattedMessage id="applications.configurations.revisions" />
      </Heading>
      {revisions.total > 0 && (
        <BoxedList>
          {revisions.items.map((item) => (
            <BoxedList.Item>
              {`${configuration.name} (Revision ${item.revision})`}
            </BoxedList.Item>
          ))}
        </BoxedList>
      )}
      {revisions.total === 0 && (
        <p className="rounded-sm border border-black/20 p-6 text-center text-black/30">
          <FormattedMessage id="applications.configurations.revisions.empty" />
        </p>
      )}
      {revisions.total > limit && (
        <PaginationToolbar
          skip={skip}
          limit={limit}
          total={revisions.total}
          onChange={setSkip}
        />
      )}
    </Card>
  );
}
