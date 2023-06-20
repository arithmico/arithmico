import classNames from "classnames";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Card } from "../../../../components/card/card";
import Heading from "../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../components/pagination-toolbar/pagination-toolbar";
import { useGetUsersQuery } from "../../../../store/api/resources/users/users.api";
import { UsersBreadcrumbs } from "./components/users-breadcrumbs";
import { UsersTable } from "./components/users-table";

export function UsersPage() {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { data, isSuccess } = useGetUsersQuery({
    skip,
    limit,
  });

  return (
    <>
      <UsersBreadcrumbs />
      <Heading level={1} className={classNames("my-4")}>
        <FormattedMessage id="admin.users" />
      </Heading>

      {isSuccess && data && (
        <>
          <Card>
            <UsersTable users={data.items} />
          </Card>
          <PaginationToolbar
            skip={skip}
            limit={limit}
            onChange={setSkip}
            total={data.total}
          />
        </>
      )}
    </>
  );
}
