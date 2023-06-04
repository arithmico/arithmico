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
      <Heading level={inline ? 2 : 1} className={classNames("mt-4")}>
        <FormattedMessage id="security.policies.title" />
      </Heading>
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
