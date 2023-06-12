import classNames from "classnames";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ButtonLink } from "../../../../components/button-link/button-link";
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
    limit: 10,
  });

  return (
    <>
      {!inline && <SecurityPoliciesBreadcrumbs />}
      <div className={classNames("my-4", "flex", "items-center")}>
        <Heading level={inline ? 2 : 1} className={classNames("my-0")}>
          <FormattedMessage id="security.policies.title" />
        </Heading>
        <ButtonLink
          to="/administration/security-policies/new"
          className={classNames("ml-auto")}
        >
          <AddIcon className={classNames("w-6", "h-6", "fill-white", "mr-2")} />{" "}
          <FormattedMessage id="security.policies.add" />
        </ButtonLink>
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
