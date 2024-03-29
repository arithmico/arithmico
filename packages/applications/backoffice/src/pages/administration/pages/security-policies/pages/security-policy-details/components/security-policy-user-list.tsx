import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { Card } from "../../../../../../../components/card/card";
import Heading from "../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { ChevronRightIcon } from "../../../../../../../icons/chevron-right.icon";
import { EditIcon } from "../../../../../../../icons/edit.icon";
import { useGetUsersForSecurityPolicyQuery } from "../../../../../../../store/api/resources/users/users.api";
import { EditSecurityPolicyUsersDialog } from "./edit-security-policy-users.dialog";

export interface SecurityPolicyUserListProps {
  policyId: string;
}

export function SecurityPolicyUserList({
  policyId,
}: SecurityPolicyUserListProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isSuccess } = useGetUsersForSecurityPolicyQuery({
    policyId,
    skip,
    limit,
  });
  const navigate = useNavigate();

  return (
    <>
      <EditSecurityPolicyUsersDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        policyId={policyId}
      />
      <Card>
        <div className="mb-4 flex">
          <Heading level={2}>
            <FormattedMessage id="administration.security-policies.users" />
          </Heading>
          <button
            className="ml-auto flex items-center justify-center"
            onClick={() => setIsDialogOpen(true)}
          >
            <EditIcon className="h-6 w-6 fill-black" />
            <span className="sr-only">
              <FormattedMessage id="administration.security-policies.users.edit" />
            </span>
          </button>
        </div>
        {isSuccess && (
          <>
            {data.items.length > 0 && (
              <BoxedList>
                {data.items.map((user) => {
                  const userUrl = `/administration/users/${user.id}`;
                  return (
                    <BoxedList.Item
                      key={user.id}
                      className="py-2 pl-4 pr-2"
                      onClick={() => navigate(userUrl)}
                    >
                      {user.username}
                      <Link to={userUrl} className="ml-auto">
                        <span className="sr-only">
                          <FormattedMessage id="administration.security-policies.users.details" />
                        </span>
                        <ChevronRightIcon className="h-6 w-6 fill-black/50" />
                      </Link>
                    </BoxedList.Item>
                  );
                })}
              </BoxedList>
            )}
            {data.items.length === 0 && (
              <p className="rounded-sm border border-black/20 p-6 text-center text-black/30">
                <FormattedMessage id="administration.security-policies.users.empty" />
              </p>
            )}
            {data.total > limit && (
              <PaginationToolbar
                className="mt-4"
                onChange={setSkip}
                limit={data.limit}
                skip={data.skip}
                total={data.total}
              />
            )}
          </>
        )}
      </Card>
    </>
  );
}
