import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { Card } from "../../../../../../../components/card/card";
import Heading from "../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { AddIcon } from "../../../../../../../icons/add.icon";
import {
  useGetConfigurationByIdQuery,
  useGetConfigurationRevisionsQuery,
} from "../../../../../../../store/api/resources/configurations/configurations.api";
import { CreateConfigurationRevisionDialog } from "./create-configuration-revision.dialog";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!configurationIsSuccess || !revisionsIsSuccess) {
    return <></>;
  }

  return (
    <>
      <CreateConfigurationRevisionDialog
        configurationId={configurationId}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <Card>
        <div className="mb-4 flex items-center">
          <Heading level={2}>
            <FormattedMessage id="applications.configurations.revisions" />
          </Heading>
          <button
            className="ml-auto [&>svg]:fill-black/50 [&>svg]:hover:fill-black"
            onClick={() => setIsDialogOpen(true)}
          >
            <AddIcon className="h-6 w-6" />
            <span className="sr-only">
              <FormattedMessage id="applications.configurations.revisions.add" />
            </span>
          </button>
        </div>
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
    </>
  );
}
