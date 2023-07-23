import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { BoxedList } from "../../../../../../../../../components/boxed-list/boxed-list";
import { Card } from "../../../../../../../../../components/card/card";
import Heading from "../../../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { ChevronRightIcon } from "../../../../../../../../../icons/chevron-right.icon";
import { useGetFeatureFlagsForConfigurationRevisionQuery } from "../../../../../../../../../store/api/resources/feature-flags/feature-flags.api";

export interface RevisionFeatureFlagsCardProps {
  configurationId: string;
  revisionId: string;
}

export function RevisionFeatureFlagsCard({
  configurationId,
  revisionId,
}: RevisionFeatureFlagsCardProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { isSuccess, data } = useGetFeatureFlagsForConfigurationRevisionQuery({
    configurationId,
    revisionId,
    limit,
    skip,
  });
  const navigate = useNavigate();

  if (!isSuccess) {
    return <></>;
  }

  return (
    <Card>
      <Heading level={2} className="mb-4">
        <FormattedMessage id="applications.configurations.revisions.feature-flags" />
      </Heading>
      <BoxedList>
        {data.items.map((featureFlag) => {
          const featureFlagUrl = `/applications/feature-flags/${featureFlag.id}`;
          return (
            <BoxedList.Item
              className="p-2"
              key={featureFlag.id}
              onClick={() => navigate(featureFlagUrl)}
            >
              {featureFlag.name}
              <Link to={featureFlagUrl} className="ml-auto">
                <span className="sr-only">
                  <FormattedMessage id="applications.configurations.revisions.feature-flags.details" />
                </span>
                <ChevronRightIcon className="h-6 w-6 fill-black/50" />
              </Link>
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
