import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Checkbox } from "../../../../../../../components/checkbox/checkbox";
import { DialogHeader } from "../../../../../../../components/dialog-header/dialog-header";
import { DialogWithBackdrop } from "../../../../../../../components/dialog-with-backdrop/dialog-with-backdrop";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { useGetSecurityPoliciesWithAttachedToUserGroupCheckQuery } from "../../../../../../../store/api/resources/security-policies/security-policies.api";
import {
  useAttachSecurityPolicyDtoUserGroupMutation,
  useDetachSecurityPolicyDtoUserGroupMutation,
} from "../../../../../../../store/api/resources/user-groups/user-groups.api";

export interface EditUserGroupSecurityPoliciesDialogProps {
  onClose: () => void;
  isOpen: boolean;
  groupId: string;
}

export function EditUserGroupSecurityPoliciesDialog({
  onClose,
  isOpen,
  groupId,
}: EditUserGroupSecurityPoliciesDialogProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { data, isSuccess } =
    useGetSecurityPoliciesWithAttachedToUserGroupCheckQuery({
      skip,
      limit,
      groupId,
    });
  const [attachSecurityPolicy] = useAttachSecurityPolicyDtoUserGroupMutation();
  const [detachSecurityPolicy] = useDetachSecurityPolicyDtoUserGroupMutation();

  return (
    <DialogWithBackdrop isOpen={isOpen} onClose={onClose}>
      <DialogHeader onClose={onClose}>
        <FormattedMessage id="administration.user-groups.security-policies.edit" />
      </DialogHeader>
      {isSuccess && (
        <>
          <ul className="mb-auto flex flex-col gap-1 overflow-y-auto">
            {data.items.map((securityPolicy) => (
              <li
                key={securityPolicy.id}
                className="flex items-center rounded-sm border border-black/20  hover:bg-black/5"
              >
                <label className="flex w-full items-center py-2 pl-4 pr-2">
                  {securityPolicy.name}
                  <Checkbox
                    checked={securityPolicy.isAttached}
                    onChange={() => {
                      if (securityPolicy.isAttached) {
                        detachSecurityPolicy({
                          groupId,
                          policyId: securityPolicy.id,
                        });
                      } else {
                        attachSecurityPolicy({
                          groupId,
                          policyId: securityPolicy.id,
                        });
                      }
                    }}
                  />
                </label>
              </li>
            ))}
          </ul>
          {data.total > limit && (
            <PaginationToolbar
              className="mt-4"
              onChange={setSkip}
              limit={limit}
              skip={data.skip}
              total={data.total}
            />
          )}
        </>
      )}
    </DialogWithBackdrop>
  );
}
