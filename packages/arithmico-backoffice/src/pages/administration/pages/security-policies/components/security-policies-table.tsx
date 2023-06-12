import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { TableCell } from "../../../../../components/table-cell/table-cell";
import { TableHeaderCell } from "../../../../../components/table-header-cell/table-header-cell";
import { TableRow } from "../../../../../components/table-row/table-row";
import { Table } from "../../../../../components/table/table";
import { ChevronRightIcon } from "../../../../../icons/chevron-right.icon";
import { SecurityPolicyDtoWithPrincipalsCount } from "../../../../../store/api/resources/security-policies/security-policies.types";

export interface SecurityPoliciesTableProps {
  policies: SecurityPolicyDtoWithPrincipalsCount[];
}

export function SecurityPoliciesTable({
  policies,
}: SecurityPoliciesTableProps) {
  const navigate = useNavigate();

  return (
    <Table
      className={classNames("table-fixed")}
      header={
        <>
          <TableHeaderCell className={classNames("w-1/4")}>
            <FormattedMessage id="admin.security-policies.id" />
          </TableHeaderCell>
          <TableHeaderCell className={classNames("w-1/5")}>
            <FormattedMessage id="admin.security-policies.name" />
          </TableHeaderCell>
          <TableHeaderCell className={classNames("w-1/5")}>
            <FormattedMessage id="admin.security-policies.attributes" />
          </TableHeaderCell>
          <TableHeaderCell>
            <FormattedMessage id="admin.security-policies.principals" />
          </TableHeaderCell>
          <TableHeaderCell>
            <FormattedMessage id="admin.security-policies.readonly" />
          </TableHeaderCell>
        </>
      }
    >
      {policies.map((item, index) => (
        <TableRow
          onClick={() =>
            navigate(`/administration/security-policies/${item.id}`)
          }
          key={index}
        >
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.attributes.length}</TableCell>
          <TableCell>{item.principals}</TableCell>
          <TableCell>
            {item.readonly ? (
              <FormattedMessage id="common.yes" />
            ) : (
              <FormattedMessage id="common.no" />
            )}
          </TableCell>
          <TableCell>
            <Link
              to={`/administration/security-policies/${item.id}`}
              className={classNames("float-right", "flex", "items-center")}
            >
              <span className="sr-only">Details</span>
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
