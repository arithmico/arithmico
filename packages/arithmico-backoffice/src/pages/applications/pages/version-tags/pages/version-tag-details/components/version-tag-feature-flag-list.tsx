import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { Card } from "../../../../../../../components/card/card";
import Heading from "../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { ChevronRightIcon } from "../../../../../../../icons/chevron-right.icon";
import { useGetFeatureFlagsForVersionTagQuery } from "../../../../../../../store/api/resources/feature-flags/feature-flags.api";

export interface VersionTagFeatureFlagListPorps {
  tagId: string;
}

export function VersionTagFeatureFlagList({
  tagId,
}: VersionTagFeatureFlagListPorps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { isSuccess, data } = useGetFeatureFlagsForVersionTagQuery({
    tagId,
    skip,
    limit,
  });
  const navigate = useNavigate();

  return (
    <Card>
      <Heading level={2} className="mb-4">
        <FormattedMessage id="versions.feature-flags" />
      </Heading>
      {isSuccess && (
        <>
          {data.items.length > 0 && (
            <BoxedList>
              {data.items.map((featureFlag) => {
                const featureFlagUrl = `/applications/feature-flags/${featureFlag.id}`;
                return (
                  <BoxedList.Item
                    className="grid grid-cols-4 p-2"
                    onClick={() => navigate(featureFlagUrl)}
                  >
                    <span className="col-span-2">{featureFlag.name}</span>
                    <span>
                      <FormattedMessage
                        id={`versions.feature-flags.type.${featureFlag.type}`}
                        defaultMessage={featureFlag.type}
                      />
                    </span>
                    <div>
                      <Link className="sr-only" to={featureFlagUrl}>
                        <FormattedMessage id="versions.feature-flags.details" />
                      </Link>
                      <ChevronRightIcon className="ml-auto h-8 w-8 fill-black/50" />
                    </div>
                  </BoxedList.Item>
                );
              })}
            </BoxedList>
          )}
          {data.total > limit && (
            <PaginationToolbar
              skip={skip}
              limit={limit}
              total={data.total}
              onChange={setSkip}
            />
          )}
        </>
      )}
    </Card>
  );
}
