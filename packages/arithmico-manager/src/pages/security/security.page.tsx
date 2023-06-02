import classNames from "classnames";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Card } from "../../components/card/card";
import Heading from "../../components/heading/heading";
import { PaginationToolbar } from "../../components/pagination-toolbar/pagination-toolbar";
import { Table } from "../../components/table/table";
import { useGetSecurityPolicesQuery } from "../../store/api/slices/security/security.api";

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
                <FormattedMessage id="security.policies.fields.id" />,
                <FormattedMessage id="security.policies.fields.name" />,
                <FormattedMessage id="security.policies.fields.attributes" />,
              ]}
              rows={data.items.map((item) => [
                item.id,
                item.name,
                item.attributes.length,
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
