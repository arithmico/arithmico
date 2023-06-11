import classNames from "classnames";
import { useParams } from "react-router-dom";
import Heading from "../../../../../../components/heading/heading";
import { LoadingPage } from "../../../../../../components/loading-page/loading-page";
import { useGetUserGroupByIdQuery } from "../../../../../../store/api/resources/user-groups/user-groups.api";
import { UserGroupDetailsBreadcrumbs } from "./components/user-group-details-breadcrumbs";
import { UserGroupDetailsCard } from "./components/user-group-details-card";

export function UserGroupDetailsPage() {
  const { groupId } = useParams();
  const { isSuccess, isError, isLoading, data } = useGetUserGroupByIdQuery({
    groupId: groupId!,
  });

  return (
    <>
      <LoadingPage isError={isError} isLoading={isLoading} />
      {isSuccess && data && (
        <>
          <UserGroupDetailsBreadcrumbs groupName={data.name} />
          <Heading level={1} className={classNames("my-4")}>
            {data.name}
          </Heading>
          <UserGroupDetailsCard />
        </>
      )}
    </>
  );
}
