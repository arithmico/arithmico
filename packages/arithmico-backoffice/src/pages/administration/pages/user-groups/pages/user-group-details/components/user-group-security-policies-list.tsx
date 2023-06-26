import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Card } from "../../../../../../../components/card/card";
import Heading from "../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { EditIcon } from "../../../../../../../icons/edit.icon";
import { useGetSecurityPoliciesAttachedToUserGroupQuery } from "../../../../../../../store/api/resources/user-groups/user-groups.api";

export interface UserGroupSecurityPoliciesListProps {
  groupId: string;
}

export function UserGroupSecurityPoliciesList({
  groupId,
}: UserGroupSecurityPoliciesListProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { data, isSuccess } = useGetSecurityPoliciesAttachedToUserGroupQuery({
    groupId,
    skip,
    limit,
  });

  return (
    <Card>
      <div className="my-4 flex items-center">
        <Heading>Sicherheitsrichtlinien</Heading>
        <button className="ml-auto flex items-center justify-center">
          <EditIcon className="h-6 w-6 fill-black" />
          <span className="sr-only">
            <FormattedMessage id="admin.user-groups.security-policies.edit" />
          </span>
        </button>
      </div>
      {isSuccess && (
        <>
          {data.items.length > 0 &&
            data.items.map((securityPolicy) => <li>{securityPolicy.name}</li>)}
          {data.items.length === 0 && (
            <p className="rounded-sm border border-black/30 p-6 text-center text-black/30">
              <FormattedMessage id="admin.user-groups.security-policies.empty" />
            </p>
          )}
          {data.total > limit && (
            <PaginationToolbar
              skip={data.skip}
              limit={data.limit}
              total={data.total}
              onChange={setSkip}
            />
          )}
        </>
      )}
    </Card>
  );
}
