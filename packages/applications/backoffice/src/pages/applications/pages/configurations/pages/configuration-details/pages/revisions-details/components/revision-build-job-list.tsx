import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { BoxedList } from "../../../../../../../../../components/boxed-list/boxed-list";
import { Card } from "../../../../../../../../../components/card/card";
import Heading from "../../../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../../../components/pagination-toolbar/pagination-toolbar";
import LoadingIcon from "../../../../../../../../../icons/loading.icon";
import { useGetBuildJobsForConfigurationRevisionQuery } from "../../../../../../../../../store/api/resources/configurations/configurations.api";
import { PlatformBuildJobStatus } from "../../../../../../../../../store/api/resources/configurations/configurations.types";

export interface RevisionBuildJobListProps {
  configurationId: string;
  configurationRevisionId: string;
}

export function RevisionBuildJobList({
  configurationId,
  configurationRevisionId,
}: RevisionBuildJobListProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { data, isSuccess, refetch } =
    useGetBuildJobsForConfigurationRevisionQuery({
      configurationId,
      configurationRevisionId,
      skip,
      limit,
    });

  if (!isSuccess) {
    return <></>;
  }

  const someRunning = data.items.some((item) =>
    item.platforms.some(
      (paltform) => paltform.status === PlatformBuildJobStatus.Running
    )
  );

  if (someRunning) {
    setTimeout(refetch, 10_000);
  }

  return (
    <Card>
      <Heading className="mb-4" level={2}>
        <FormattedMessage id="applications.configurations.revisions.build" />
      </Heading>
      <BoxedList>
        {data.items.map((buildJob) => {
          const running = buildJob.platforms.some(
            (platform) => platform.status === PlatformBuildJobStatus.Running
          );

          return (
            <BoxedList.Item className="p-2" key={buildJob.id}>
              {buildJob.name}
              {running && (
                <LoadingIcon className="w-8 h-8 stroke-black/30 ml-auto" />
              )}
            </BoxedList.Item>
          );
        })}
      </BoxedList>
      {data.total > limit && (
        <PaginationToolbar
          skip={skip}
          limit={limit}
          total={data.total}
          onChange={setSkip}
        />
      )}
    </Card>
  );
}
