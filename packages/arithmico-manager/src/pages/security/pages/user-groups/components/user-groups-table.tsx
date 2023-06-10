import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { TableCell } from "../../../../../components/table-cell/table-cell";
import { TableHeaderCell } from "../../../../../components/table-header-cell/table-header-cell";
import { TableRow } from "../../../../../components/table-row/table-row";
import { Table } from "../../../../../components/table/table";
import { UserGroupDtoWithMembers } from "../../../../../store/api/resources/user-groups/user-groups.types";

export interface UserGroupsTableProps {
  userGroups: UserGroupDtoWithMembers[];
}

export function UserGroupsTable({ userGroups }: UserGroupsTableProps) {
  return (
    <Table
      className={classNames("table-fixed")}
      header={[
        <TableHeaderCell className={classNames("w-1/4")}>
          <FormattedMessage id="security.user-groups.id" />
        </TableHeaderCell>,
        <TableHeaderCell className={classNames("w-1/4")}>
          <FormattedMessage id="security.user-groups.name" />
        </TableHeaderCell>,
        <TableHeaderCell className={classNames("w-1/4")}>
          <FormattedMessage id="security.user-groups.members" />
        </TableHeaderCell>,
        <TableHeaderCell>
          <FormattedMessage id="security.user-groups.readonly" />
        </TableHeaderCell>,
        <TableHeaderCell>
          <span className="sr-only">
            <FormattedMessage id="security.user-groups.details" />
          </span>
        </TableHeaderCell>,
      ]}
    >
      {userGroups.map((group) => (
        <TableRow key={group.id}>
          <TableCell>{group.id}</TableCell>
          <TableCell>{group.name}</TableCell>
          <TableCell>{group.members}</TableCell>
          <TableCell>{group.readonly}</TableCell>
          <TableCell>
            <Link to={`/security/user-groups/${group.id}`}>
              <FormattedMessage id="security.user-groups.details" />
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
