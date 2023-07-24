import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { Card } from "../../../../../../../components/card/card";
import Heading from "../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { SemanticVersion } from "../../../../../../../components/semantic-version/semantic-version";
import { useGetVersionTagsForFeatureFlagQuery } from "../../../../../../../store/api/resources/version-tags/version-tags.api";

export interface SupportedVersionTagsForFeatureFlagListProps {
  flagId: string;
}

export function SupportedVersionTagsForFeatureFlagList({
  flagId,
}: SupportedVersionTagsForFeatureFlagListProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { isSuccess, data } = useGetVersionTagsForFeatureFlagQuery({
    flagId,
    skip,
    limit,
  });

  return (
    <Card>
      <Heading level={2} className="mb-4">
        <FormattedMessage id="applications.feature-flags.details.supported-versions" />
      </Heading>
      {isSuccess && (
        <>
          {data.items.length > 0 && (
            <BoxedList>
              {data.items.map((versionTag) => (
                <BoxedList.Item key={versionTag.id}>
                  <Link
                    className="h-full w-full p-2"
                    to={`/applications/version-tags/${versionTag.id}`}
                  >
                    <SemanticVersion version={versionTag.version} />
                  </Link>
                </BoxedList.Item>
              ))}
            </BoxedList>
          )}
          {data.total > limit && (
            <PaginationToolbar
              className="mt-4"
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
