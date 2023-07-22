import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { TableCell } from "../../../../../components/table-cell/table-cell";
import { TableHeaderCell } from "../../../../../components/table-header-cell/table-header-cell";
import { TableRow } from "../../../../../components/table-row/table-row";
import { Table } from "../../../../../components/table/table";
import { ChevronRightIcon } from "../../../../../icons/chevron-right.icon";
import { UserGroupWithDetailsDto } from "../../../../../store/api/resources/user-groups/user-groups.types";

export interface UserGroupsTableProps {
  userGroups: UserGroupWithDetailsDto[];
}

export function UserGroupsTable({ userGroups }: UserGroupsTableProps) {
  const navigate = useNavigate();

  return (
    <Table
      className={classNames("table-fixed")}
      header={
        <>
          <TableHeaderCell key={"group-id"} className={classNames("w-1/4")}>
            <FormattedMessage id="administration.user-groups.id" />
          </TableHeaderCell>
          <TableHeaderCell key={"group-name"} className={classNames("w-1/4")}>
            <FormattedMessage id="administration.user-groups.name" />
          </TableHeaderCell>
          <TableHeaderCell
            key={"group-members"}
            className={classNames("w-1/4")}
          >
            <FormattedMessage id="administration.user-groups.members" />
          </TableHeaderCell>
          <TableHeaderCell key={"group-readonly"}>
            <FormattedMessage id="administration.user-groups.readonly" />
          </TableHeaderCell>
          <TableHeaderCell key={"group-details"}>
            <span className="sr-only">
              <FormattedMessage id="administration.user-groups.details" />
            </span>
          </TableHeaderCell>
        </>
      }
    >
      {userGroups.map((group) => (
        <TableRow
          key={group.id}
          onClick={() => navigate(`/administration/user-groups/${group.id}`)}
          className="hover:cursor-pointer"
        >
          <TableCell>{group.id}</TableCell>
          <TableCell>{group.name}</TableCell>
          <TableCell>{group.members}</TableCell>
          <TableCell>
            {group.readonly ? (
              <FormattedMessage id="common.yes" />
            ) : (
              <FormattedMessage id="common.no" />
            )}
          </TableCell>
          <TableCell>
            <Link
              to={`/administration/user-groups/${group.id}`}
              className={classNames("float-right", "flex", "items-center")}
            >
              <span className="sr-only">
                <FormattedMessage id="administration.user-groups.details" />
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
