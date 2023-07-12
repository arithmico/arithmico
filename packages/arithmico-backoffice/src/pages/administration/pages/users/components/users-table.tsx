import classNames from "classnames";
import { FormattedDate, FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { TableCell } from "../../../../../components/table-cell/table-cell";
import { TableHeaderCell } from "../../../../../components/table-header-cell/table-header-cell";
import { TableRow } from "../../../../../components/table-row/table-row";
import { Table } from "../../../../../components/table/table";
import { ChevronRightIcon } from "../../../../../icons/chevron-right.icon";
import { UserResponseDto } from "../../../../../store/api/resources/users/users.types";

export interface UsersTableProps {
  users: UserResponseDto[];
}

export function UsersTable({ users }: UsersTableProps) {
  const navigate = useNavigate();

  return (
    <Table
      className={classNames("table-fixed")}
      header={
        <>
          <TableHeaderCell className={classNames("w-1/4")}>
            <FormattedMessage id="admin.users.id" />
          </TableHeaderCell>
          <TableHeaderCell className={classNames("w-1/5")}>
            <FormattedMessage id="admin.users.username" />
          </TableHeaderCell>
          <TableHeaderCell className={classNames("w-1/5")}>
            <FormattedMessage id="admin.users.user-groups" />
          </TableHeaderCell>
          <TableHeaderCell>
            <FormattedMessage id="admin.users.security-policies" />
          </TableHeaderCell>
          <TableHeaderCell>
            <FormattedMessage id="admin.users.created-at" />
          </TableHeaderCell>
        </>
      }
    >
      {users.map((item, index) => (
        <TableRow
          onClick={() => navigate(`/administration/users/${item.id}`)}
          key={index}
          className="hover:cursor-pointer"
        >
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.username}</TableCell>
          <TableCell>{item.userGroups}</TableCell>
          <TableCell>{item.securityPolicies}</TableCell>
          <TableCell>
            <FormattedDate value={item.createdAt} dateStyle={"medium"} />
          </TableCell>
          <TableCell>
            <Link
              to={`/administration/users/${item.id}`}
              className={classNames("float-right", "flex", "items-center")}
            >
              <span className="sr-only">
                <FormattedMessage id="admin.users.details" />
              </span>
              <ChevronRightIcon
                className={classNames("w-8", "h-8", "fill-neutral-500")}
              />
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
