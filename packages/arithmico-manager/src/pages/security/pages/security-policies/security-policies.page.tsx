import classNames from "classnames";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Card } from "../../../../components/card/card";
import Heading from "../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../components/pagination-toolbar/pagination-toolbar";
import { AddIcon } from "../../../../icons/add.icon";
import { useGetSecurityPolicesQuery } from "../../../../store/api/resources/security-policies/security-policies.api";
import { SecurityPoliciesBreadcrumbs } from "./components/security-policies-breacrumbs";
import { SecurityPoliciesTable } from "./components/security-policies-table";

export interface SecurityPoliciesPageProps {
  inline?: boolean;
}

export function SecurityPoliciesPage({ inline }: SecurityPoliciesPageProps) {
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
          <FormattedMessage id="security.policies.add" />
        </Link>
      </div>
      {isSuccess && data && (
        <>
          <Card>
            <SecurityPoliciesTable policies={data.items} />
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
