import classNames from "classnames";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ButtonLink } from "../../../../components/button-link/button-link";
import { Card } from "../../../../components/card/card";
import Heading from "../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../components/pagination-toolbar/pagination-toolbar";
import { AddIcon } from "../../../../icons/add.icon";
import { useGetUserGroupsQuery } from "../../../../store/api/resources/user-groups/user-groups.api";
import { UserGroupsBreadcrumbs } from "./components/user-groups-breadcrumbs";
import { UserGroupsTable } from "./components/user-groups-table";

export interface UserGroupsPageProps {
  inline?: boolean;
}

export function UserGroupsPage({ inline }: UserGroupsPageProps) {
  const [skip, setSkip] = useState(0);
  const { isSuccess, data } = useGetUserGroupsQuery({
    skip,
    limit: 10,
  });

  return (
    <>
      {!inline && <UserGroupsBreadcrumbs />}
      <div className={classNames("flex", "my-4")}>
        <Heading level={1}>
          <FormattedMessage id="security.user-groups.title" />
        </Heading>
        <ButtonLink
          className={classNames("ml-auto")}
          to="/administration/user-groups/new"
        >
          <AddIcon className={classNames("w-6", "h-6", "fill-white", "mr-2")} />{" "}
          <FormattedMessage id="security.user-groups.new" />
        </ButtonLink>
      </div>
      {isSuccess && data && (
        <>
          <Card>
            <UserGroupsTable userGroups={data.items} />
          </Card>
          <PaginationToolbar
            limit={data.limit}
            skip={data.skip}
            total={data.total}
            onChange={setSkip}
          />
        </>
      )}
    </>
  );
}
