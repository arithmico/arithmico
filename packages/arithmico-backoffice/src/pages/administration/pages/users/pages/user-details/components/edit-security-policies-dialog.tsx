import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Checkbox } from "../../../../../../../components/checkbox/checkbox";
import { DialogHeader } from "../../../../../../../components/dialog-header/dialog-header";
import { DialogWithBackdrop } from "../../../../../../../components/dialog-with-backdrop/dialog-with-backdrop";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { useGetSecurityPolicesQuery } from "../../../../../../../store/api/resources/security-policies/security-policies.api";
import { SecurityPolicyDto } from "../../../../../../../store/api/resources/security-policies/security-policies.types";
import {
  useAttachSecurityPolicyToUserMutation,
  useDetachSecurityPolicyFromUserMutation,
} from "../../../../../../../store/api/resources/users/users.api";

export interface EditSecurityPoliciesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  attachedSecurityPolicies: SecurityPolicyDto[];
  userId: string;
}

export function EditSecurityPoliciesDialog({
  isOpen,
  onClose,
  attachedSecurityPolicies,
  userId,
}: EditSecurityPoliciesDialogProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const selectedIds = attachedSecurityPolicies.map((policy) => policy.id);
  const { data, isSuccess } = useGetSecurityPolicesQuery({
    skip,
    limit,
  });
  const [detachPolicy] = useDetachSecurityPolicyFromUserMutation();
  const [attachPolicy] = useAttachSecurityPolicyToUserMutation();

  return (
    <DialogWithBackdrop isOpen={isOpen} onClose={onClose}>
      <DialogHeader onClose={onClose}>
        <FormattedMessage id="admin.users.security-policies.edit" />
      </DialogHeader>
      {isSuccess && data && (
        <>
          <ul className="flex flex-col gap-1">
            {data.items.map((policy) => (
              <li
                key={policy.id}
                className="flex items-center rounded-sm border border-black/30 py-2 pl-4 pr-2 hover:bg-black/5"
              >
                <label className="flex w-full items-center">
                  {policy.name}
                  <Checkbox
                    onChange={() => {
                      if (selectedIds.includes(policy.id)) {
                        detachPolicy({
                          policyId: policy.id,
                          userId,
                        });
                      } else {
                        attachPolicy({
                          policyId: policy.id,
                          userId,
                        });
                      }
                    }}
                    checked={selectedIds.includes(policy.id)}
                  />
                </label>
              </li>
            ))}
          </ul>
          <PaginationToolbar
            className="mt-4"
            skip={skip}
            limit={limit}
            total={data.total}
            onChange={setSkip}
          />
        </>
      )}
    </DialogWithBackdrop>
  );
}
