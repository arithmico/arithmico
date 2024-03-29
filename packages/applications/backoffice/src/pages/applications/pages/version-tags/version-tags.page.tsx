import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { BoxedList } from "../../../../components/boxed-list/boxed-list";
import { Card } from "../../../../components/card/card";
import Heading from "../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../components/pagination-toolbar/pagination-toolbar";
import { SemanticVersion } from "../../../../components/semantic-version/semantic-version";
import { ChevronRightIcon } from "../../../../icons/chevron-right.icon";
import { useGetVersionTagsQuery } from "../../../../store/api/resources/version-tags/version-tags.api";
import { VersionTagsBreadcrumbs } from "./components/version-tags-breadcrumbs";

export function VersionTagsPage() {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { isSuccess, data } = useGetVersionTagsQuery({ skip, limit });
  const navigate = useNavigate();

  return (
    <>
      <VersionTagsBreadcrumbs />
      <Heading level={1} className="my-4">
        <FormattedMessage id="applications.version-tags" />
      </Heading>
      {isSuccess && (
        <Card>
          {data.items.length > 0 && (
            <BoxedList>
              {data.items.map((versionTag) => {
                const versionTagUrl = `/applications/version-tags/${versionTag.id}`;
                return (
                  <BoxedList.Item
                    className="px-4 py-2"
                    key={versionTag.id}
                    onClick={() => navigate(versionTagUrl)}
                  >
                    <SemanticVersion version={versionTag.version} />
                    <Link to={versionTagUrl} className="ml-auto">
                      <ChevronRightIcon className="h-6 w-6 fill-black/50" />
                    </Link>
                  </BoxedList.Item>
                );
              })}
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
        </Card>
      )}
    </>
  );
}
