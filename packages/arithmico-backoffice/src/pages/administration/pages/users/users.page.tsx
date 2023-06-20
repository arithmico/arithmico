import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ButtonLink } from "../../../../components/button-link/button-link";
import { Card } from "../../../../components/card/card";
import Heading from "../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../components/pagination-toolbar/pagination-toolbar";
import { AddIcon } from "../../../../icons/add.icon";
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
      <div className="my-4 flex items-center">
        <Heading level={1}>
          <FormattedMessage id="admin.users" />
        </Heading>

        <ButtonLink to="/administration/users/new" className="ml-auto">
          <AddIcon className="mr-2 h-6 w-6 fill-white" />{" "}
          <FormattedMessage id="admin.users.new" />
        </ButtonLink>
      </div>

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
