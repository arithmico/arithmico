import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { Card } from "../../../../../../../components/card/card";
import Heading from "../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { EditIcon } from "../../../../../../../icons/edit.icon";
import { useGetUserGroupsForSecurityPolicyQuery } from "../../../../../../../store/api/resources/user-groups/user-groups.api";
import { EditSecurityPolicyUserGroupsDialog } from "./edit-security-policy-user-groups.dialog";

export interface SecurityPolicyUserGroupListProps {
  policyId: string;
}

export function SecurityPolicyUserGroupList({
  policyId,
}: SecurityPolicyUserGroupListProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isSuccess } = useGetUserGroupsForSecurityPolicyQuery({
    skip,
    limit,
    policyId,
  });

  return (
    <>
      <EditSecurityPolicyUserGroupsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        policyId={policyId}
      />
      <Card>
        <div className="mb-4 flex">
          <Heading level={2}>
            <FormattedMessage id="admin.security-policies.user-groups" />
          </Heading>
          <button
            className="ml-auto flex items-center justify-center"
            onClick={() => setIsDialogOpen(true)}
          >
            <EditIcon className="h-6 w-6 fill-black" />
            <span className="sr-only">
              <FormattedMessage id="admin.security-policies.user-groups.edit" />
            </span>
          </button>
        </div>
        {isSuccess && (
          <BoxedList>
            {data.items.map((userGroup) => (
              <BoxedList.Item className="py-2 pl-4 pr-2">
                {userGroup.name}
              </BoxedList.Item>
            ))}
            {data.items.length === 0 && (
              <p className="rounded-sm border border-black/30 p-6 text-center text-black/30">
                <FormattedMessage id="admin.security-policies.user-groups.empty" />
              </p>
            )}
            {data.total > limit && (
              <PaginationToolbar
                className="mt-4"
                skip={skip}
                limit={limit}
                total={data.total}
                onChange={setSkip}
              />
            )}
          </BoxedList>
        )}
      </Card>
    </>
  );
}
