import { Children, ReactNode } from "react";
import { Link } from "react-router-dom";
import { UserGroupsBreadcrumbs } from "../../../components/user-groups-breadcrumbs";

export interface UserGroupDetailsBreadcrumbsProps {
  children?: ReactNode;
  groupName: string;
  groupId: string;
}

export function UserGroupDetailsBreadcrumbs({
  children,
  groupName,
  groupId,
}: UserGroupDetailsBreadcrumbsProps) {
  return (
    <UserGroupsBreadcrumbs>
      {children
        ? [
            <Link key="user-groups" to={`/security/user-groups/${groupId}`}>
              {groupName}
            </Link>,
            ...Children.toArray(children),
          ]
        : [groupName]}
    </UserGroupsBreadcrumbs>
  );
}
