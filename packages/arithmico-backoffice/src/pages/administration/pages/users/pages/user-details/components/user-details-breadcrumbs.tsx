import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { UsersBreadcrumbs } from "../../../components/users-breadcrumbs";

export interface UsersDetailsBreadcrumbsProps {
  children?: ReactNode;
  username: string;
  userId: string;
}

export function UserDetailsBreadcrumbs({
  children,
  username,
  userId,
}: UsersDetailsBreadcrumbsProps) {
  return (
    <UsersBreadcrumbs>
      {children
        ? [
            <Link key="create-user" to={`/administration/users/${userId}`}>
              {username}
            </Link>,
          ]
        : username}
    </UsersBreadcrumbs>
  );
}
