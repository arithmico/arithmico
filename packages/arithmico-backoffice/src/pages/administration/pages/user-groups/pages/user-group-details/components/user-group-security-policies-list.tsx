import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../../../../../../components/card/card";
import Heading from "../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { ChevronRightIcon } from "../../../../../../../icons/chevron-right.icon";
import { EditIcon } from "../../../../../../../icons/edit.icon";
import { useGetSecurityPoliciesAttachedToUserGroupQuery } from "../../../../../../../store/api/resources/user-groups/user-groups.api";
import { EditUserGroupSecurityPoliciesDialog } from "./edit-user-group-security-policies.dialog";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <EditUserGroupSecurityPoliciesDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        groupId={groupId}
      />
      <Card>
        <div className="mb-4 flex items-center">
          <Heading>Sicherheitsrichtlinien</Heading>
          <button
            className="ml-auto flex items-center justify-center"
            onClick={() => setIsDialogOpen(true)}
          >
            <EditIcon className="h-6 w-6 fill-black" />
            <span className="sr-only">
              <FormattedMessage id="admin.user-groups.security-policies.edit" />
            </span>
          </button>
        </div>
        {isSuccess && (
          <>
            {data.items.length > 0 && (
              <ul className="flex flex-col gap-1">
                {data.items.map((securityPolicy) => {
                  const policyUrl = `/administration/security-policies/${securityPolicy.id}`;
                  return (
                    <li
                      key={securityPolicy.id}
                      className="flex items-center rounded-sm border border-black/30  py-2 pl-4 pr-2 hover:cursor-pointer hover:bg-black/5"
                      onClick={() => navigate(policyUrl)}
                    >
                      {securityPolicy.name}
                      <Link to={policyUrl} className="ml-auto">
                        <span className="sr-only">
                          <FormattedMessage id="admin.user-groups.security-policies.details" />
                        </span>
                        <ChevronRightIcon className="h-6 w-6 fill-black/50" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
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
    </>
  );
}
