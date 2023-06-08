import classNames from "classnames";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../../../components/card/card";
import Heading from "../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../components/pagination-toolbar/pagination-toolbar";
import { TableCell } from "../../../../components/table-cell/table-cell";
import { TableHeaderCell } from "../../../../components/table-header-cell/table-header-cell";
import { TableRow } from "../../../../components/table-row/table-row";
import { Table } from "../../../../components/table/table";
import { AddIcon } from "../../../../icons/add.icon";
import { ChevronRightIcon } from "../../../../icons/chevron-right.icon";
import { useGetSecurityPolicesQuery } from "../../../../store/api/slices/security/security.api";
import { SecurityPoliciesBreadcrumbs } from "./components/security-policies-breacrumbs";

export interface SecurityPoliciesPageProps {
  inline?: boolean;
}

export function SecurityPoliciesPage({ inline }: SecurityPoliciesPageProps) {
  const navigate = useNavigate();
  const [skip, setSkip] = useState(0);
  const { isSuccess, data } = useGetSecurityPolicesQuery({
    skip,
    limit: 100,
  });

  return (
    <>
      {!inline && <SecurityPoliciesBreadcrumbs />}
      <div className={classNames("my-4", "flex", "items-center")}>
        <Heading level={inline ? 2 : 1} className={classNames("my-0")}>
          <FormattedMessage id="security.policies.title" />
        </Heading>
        <Link
          to="/security/security-policies/new"
          className={classNames(
            "ml-auto",
            "inline-flex",
            "justify-center",
            "items-center",
            "rounded-sm",
            "bg-indigo-600",
            "disabled:bg-indigo-300",
            "py-2",
            "pl-2",
            "pr-4",
            "font-semibold",
            "text-white",
            "shadow-sm",
            "hover:bg-indigo-500",
            "focus-visible:outline",
            "focus-visible:outline-2",
            "focus-visible:outline-offset-2",
            "focus-visible:outline-indigo-600"
          )}
        >
          <AddIcon className={classNames("w-6", "h-6", "fill-white", "mr-2")} />{" "}
          Hinzufügen
        </Link>
      </div>
      {isSuccess && data && (
        <>
          <Card>
            <Table
              className={classNames("table-fixed")}
              header={
                <>
                  <TableHeaderCell className={classNames("w-1/4")}>
                    <FormattedMessage id="security.policies.fields.id" />
                  </TableHeaderCell>
                  <TableHeaderCell className={classNames("w-1/4")}>
                    <FormattedMessage id="security.policies.fields.name" />
                  </TableHeaderCell>
                  <TableHeaderCell className={classNames("w-1/4")}>
                    <FormattedMessage id="security.policies.fields.attributes" />
                  </TableHeaderCell>
                  <TableHeaderCell>
                    <FormattedMessage id="security.policies.fields.principals" />
                  </TableHeaderCell>
                </>
              }
            >
              {data.items.map((item, index) => (
                <TableRow
                  onClick={() =>
                    navigate(`/security/security-policies/${item.id}`)
                  }
                  key={index}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.attributes.length}</TableCell>
                  <TableCell>{item.principals}</TableCell>
                  <TableCell>
                    <Link
                      to={`/security/security-policies/${item.id}`}
                      className={classNames(
                        "float-right",
                        "flex",
                        "items-center"
                      )}
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
          </Card>
          <PaginationToolbar
            skip={data.skip}
            limit={data.limit}
            total={data.total}
            onChange={setSkip}
          />
        </>
      )}
    </>
  );
}
