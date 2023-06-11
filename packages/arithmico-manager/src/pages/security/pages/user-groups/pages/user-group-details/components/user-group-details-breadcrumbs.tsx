import { Children, ReactNode } from "react";
import { Link } from "react-router-dom";
import { UserGroupsBreadcrumbs } from "../../../components/user-groups-breadcrumbs";

export interface UserGroupDetailsBreadcrumbsProps {
  children?: ReactNode;
  groupName: string;
}

export function UserGroupDetailsBreadcrumbs({
  children,
  groupName,
}: UserGroupDetailsBreadcrumbsProps) {
  return (
    <UserGroupsBreadcrumbs>
      {children
        ? [
            <Link key="user-groups" to="/security/user-groups">
              {groupName}
            </Link>,
            ...Children.toArray(children),
          ]
        : [groupName]}
    </UserGroupsBreadcrumbs>
  );
}
