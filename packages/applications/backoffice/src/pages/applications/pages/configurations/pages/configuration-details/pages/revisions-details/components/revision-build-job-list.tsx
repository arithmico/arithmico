import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { BoxedList } from "../../../../../../../../../components/boxed-list/boxed-list";
import { Card } from "../../../../../../../../../components/card/card";
import Heading from "../../../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { ChevronRightIcon } from "../../../../../../../../../icons/chevron-right.icon";
import LoadingIcon from "../../../../../../../../../icons/loading.icon";
import { WarningIcon } from "../../../../../../../../../icons/warning.icon";
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
  const navigate = useNavigate();
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
          const running =
            buildJob.platforms.some(
              (platform) => platform.status === PlatformBuildJobStatus.Running
            ) || buildJob.platforms.length === 0;
          const failed = buildJob.platforms.some(
            (platform) => platform.status === PlatformBuildJobStatus.Failed
          );
          const buildJobUrl = `/applications/configurations/${configurationId}/revisions/${configurationRevisionId}/build-jobs/${buildJob.id}`;

          return (
            <BoxedList.Item
              className="p-2"
              key={buildJob.id}
              onClick={() => {
                if (!running && !failed) {
                  navigate(buildJobUrl);
                }
              }}
            >
              {buildJob.name}
              {running && (
                <LoadingIcon className="w-6 h-6 stroke-black/30 ml-auto" />
              )}
              {failed && (
                <WarningIcon className="w-6 h-6 ml-auto stroke-black/30" />
              )}

              {!running && !failed && (
                <Link to={buildJobUrl} className="ml-auto">
                  <ChevronRightIcon className="w-6 h-6 stroke-black/30" />
                </Link>
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
