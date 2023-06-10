import { useState } from "react";
import { Card } from "../../../../components/card/card";
import Heading from "../../../../components/heading/heading";
import { useGetUserGroupsQuery } from "../../../../store/api/resources/user-groups/user-groups.api";
import { UserGroupsTable } from "./components/user-groups-table";

export function UserGroupsPage() {
  const [skip, setSkip] = useState(0);
  const { isError, isSuccess, isLoading, data } = useGetUserGroupsQuery({
    skip,
    limit: 10,
  });

  return (
    <>
      <Heading level={1}>Benutzergruppen</Heading>
      {isSuccess && data && (
        <Card>
          <UserGroupsTable userGroups={data.items} />
        </Card>
      )}
    </>
  );
}
