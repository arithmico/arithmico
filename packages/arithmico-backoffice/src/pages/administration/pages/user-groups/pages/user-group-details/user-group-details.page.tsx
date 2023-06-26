import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import Heading from "../../../../../../components/heading/heading";
import { LoadingPage } from "../../../../../../components/loading-page/loading-page";
import { DeleteIcon } from "../../../../../../icons/delete.icon";
import { EditIcon } from "../../../../../../icons/edit.icon";
import { useGetUserGroupByIdQuery } from "../../../../../../store/api/resources/user-groups/user-groups.api";
import { UserGroupDetailsBreadcrumbs } from "./components/user-group-details-breadcrumbs";
import { UserGroupDetailsCard } from "./components/user-group-details-card";
import { UserGroupMemberList } from "./components/user-group-member-list-card";
import { UserGroupSecurityPoliciesList } from "./components/user-group-security-policies-list";

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
          <UserGroupDetailsBreadcrumbs
            groupName={data.name}
            groupId={data.id}
          />
          <div className="my-4 flex">
            <Heading level={1}>{data.name}</Heading>
            {!data.readonly && (
              <menu
                className={classNames(
                  "flex",
                  "ml-auto",
                  "items-center",
                  "gap-4"
                )}
              >
                <li>
                  <span className={classNames("sr-only")}>
                    <FormattedMessage id="admin.user-groups.rename" />
                  </span>
                  <Link to="./rename">
                    <EditIcon className={classNames("w-6", "h-6")} />
                  </Link>
                </li>
                <li>
                  <span className={classNames("sr-only")}>
                    <FormattedMessage id="admin.user-groups.delete" />
                  </span>
                  <Link to="./delete">
                    <DeleteIcon className={classNames("w-6", "h-6")} />
                  </Link>
                </li>
              </menu>
            )}
          </div>
          <div className="grid-col-1 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col md:col-start-2 md:row-start-1">
              <UserGroupDetailsCard
                id={data.id}
                name={data.name}
                createdAt={data.createdAt}
                members={data.members}
                readonly={data.readonly}
              />
            </div>
            <div className="flex flex-col gap-4">
              <UserGroupMemberList groupId={data.id} />
              <UserGroupSecurityPoliciesList groupId={data.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
