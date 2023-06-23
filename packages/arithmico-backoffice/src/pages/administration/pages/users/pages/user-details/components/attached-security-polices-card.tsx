import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../../../../../../components/card/card";
import Heading from "../../../../../../../components/heading/heading";
import { ChevronRightIcon } from "../../../../../../../icons/chevron-right.icon";
import { EditIcon } from "../../../../../../../icons/edit.icon";
import { useGetSecurityPoliciesAttachedToUserQuery } from "../../../../../../../store/api/resources/users/users.api";
import { EditSecurityPoliciesDialog } from "./edit-security-policies-dialog";

export interface AttachedSecurityPoliciesCardProps {
  userId: string;
}

export function AttachedSecurityPoliciesCard({
  userId,
}: AttachedSecurityPoliciesCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isSuccess } = useGetSecurityPoliciesAttachedToUserQuery({
    userId,
  });

  return (
    <>
      {isSuccess && data && (
        <EditSecurityPoliciesDialog
          attachedSecurityPolicies={data}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          userId={userId}
        />
      )}
      <Card>
        <div className="mb-4 flex">
          <Heading level={2}>
            <FormattedMessage id="admin.users.security-policies" />
          </Heading>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="ml-auto flex items-center justify-center"
          >
            <EditIcon className="h-6 w-6 fill-black" />
            <span className="sr-only">
              <FormattedMessage id="admin.users.security-policies.edit" />
            </span>
          </button>
        </div>
        {isSuccess && (!data || data.length === 0) && (
          <p className="rounded-sm border border-black/30 p-6 text-center text-black/30">
            <FormattedMessage id="admin.users.security-policies.empty" />
          </p>
        )}
        {isSuccess && data && data.length > 0 && (
          <ul className="flex flex-col gap-1">
            {data.map((policy) => (
              <li
                key={policy.id}
                className="flex items-center rounded-sm border border-black/30  py-2 pl-4 pr-2 hover:cursor-pointer hover:bg-black/5"
                onClick={() =>
                  navigate(`/administration/security-policies/${policy.id}`)
                }
              >
                {policy.name}

                <Link
                  to={`/administration/security-policies/${policy.id}`}
                  className="ml-auto"
                >
                  <span className="sr-only">Details</span>
                  <ChevronRightIcon className="h-6 w-6 fill-black/50" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
