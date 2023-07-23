import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { DialogHeader } from "../../../../../../../components/dialog-header/dialog-header";
import { DialogWithBackdrop } from "../../../../../../../components/dialog-with-backdrop/dialog-with-backdrop";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { useGetSecurityPoliciesWithAttachedToUserCheckQuery } from "../../../../../../../store/api/resources/security-policies/security-policies.api";
import {
  useAttachSecurityPolicyToUserMutation,
  useDetachSecurityPolicyFromUserMutation,
} from "../../../../../../../store/api/resources/users/users.api";

export interface EditSecurityPoliciesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export function EditSecurityPoliciesDialog({
  isOpen,
  onClose,
  userId,
}: EditSecurityPoliciesDialogProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { data, isSuccess } =
    useGetSecurityPoliciesWithAttachedToUserCheckQuery({
      skip,
      limit,
      userId,
    });
  const [detachPolicy] = useDetachSecurityPolicyFromUserMutation();
  const [attachPolicy] = useAttachSecurityPolicyToUserMutation();

  return (
    <DialogWithBackdrop isOpen={isOpen} onClose={onClose}>
      <DialogHeader onClose={onClose}>
        <FormattedMessage id="administration.users.security-policies.edit" />
      </DialogHeader>
      {isSuccess && data && (
        <>
          <BoxedList>
            {data.items.map((policy) => (
              <BoxedList.CheckableItem
                key={policy.id}
                checked={policy.isAttached}
                onChange={() => {
                  if (policy.isAttached) {
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
              >
                {policy.name}
              </BoxedList.CheckableItem>
            ))}
          </BoxedList>
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
