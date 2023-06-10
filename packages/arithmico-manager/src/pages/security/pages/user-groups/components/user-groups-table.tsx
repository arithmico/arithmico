import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { TableHeaderCell } from "../../../../../components/table-header-cell/table-header-cell";
import { Table } from "../../../../../components/table/table";
import { UserGroupDto } from "../../../../../store/api/resources/user-groups/user-groups.types";

export interface UserGroupsTableProps {
  userGroups: UserGroupDto[];
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
    ></Table>
  );
}
