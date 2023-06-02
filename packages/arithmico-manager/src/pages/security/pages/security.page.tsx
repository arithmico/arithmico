import classNames from "classnames";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Card } from "../../../components/card/card";
import Heading from "../../../components/heading/heading";
import { PaginationToolbar } from "../../../components/pagination-toolbar/pagination-toolbar";
import { Table } from "../../../components/table/table";
import { ChevronRightIcon } from "../../../icons/chevron-right.icon";
import { useGetSecurityPolicesQuery } from "../../../store/api/slices/security/security.api";

export default function SecurityPage() {
  const [skip, setSkip] = useState(0);
  const { isSuccess, data } = useGetSecurityPolicesQuery({
    skip,
    limit: 100,
  });

  return (
    <>
      <Heading level={1} className={classNames("mt-8")}>
        <FormattedMessage id="security.title" />
      </Heading>
      <p className={classNames("mb-4", "max-w-5xl")}>
        <FormattedMessage id="security.description" />
      </p>
      <Heading level={2}>
        <FormattedMessage id="security.policies.title" />
      </Heading>
      {isSuccess && data && (
        <>
          <Card>
            <Table
              header={[
                {
                  content: (
                    <FormattedMessage id="security.policies.fields.id" />
                  ),
                },
                {
                  content: (
                    <FormattedMessage id="security.policies.fields.name" />
                  ),
                },
                {
                  content: (
                    <FormattedMessage id="security.policies.fields.attributes" />
                  ),
                },
              ]}
              rows={data.items.map((item) => [
                item.id,
                item.name,
                item.attributes.length,
                <Link
                  to={`./security-policies/${item.id}`}
                  className={classNames("float-right", "flex", "items-center")}
                >
                  <span className="sr-only">Details</span>
                  <ChevronRightIcon
                    className={classNames("w-8", "h-8", "fill-neutral-500")}
                  />
                </Link>,
              ])}
            />
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
