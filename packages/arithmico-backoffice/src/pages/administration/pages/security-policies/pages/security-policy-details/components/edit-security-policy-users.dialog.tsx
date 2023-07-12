import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { DialogHeader } from "../../../../../../../components/dialog-header/dialog-header";
import { DialogWithBackdrop } from "../../../../../../../components/dialog-with-backdrop/dialog-with-backdrop";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import {
  useAttachSecurityPolicyToUserMutation,
  useDetachSecurityPolicyFromUserMutation,
  useGetUsersWithSecurityPolicyAttachmentCheckQuery,
} from "../../../../../../../store/api/resources/users/users.api";

export interface EditSecurityPolicyUsersDialogProps {
  policyId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EditSecurityPolicyUsersDialog({
  policyId,
  isOpen,
  onClose,
}: EditSecurityPolicyUsersDialogProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { data, isSuccess } = useGetUsersWithSecurityPolicyAttachmentCheckQuery(
    {
      skip,
      limit,
      policyId,
    }
  );
  const [attachPolicy] = useAttachSecurityPolicyToUserMutation();
  const [detachPolicy] = useDetachSecurityPolicyFromUserMutation();

  return (
    <DialogWithBackdrop isOpen={isOpen} onClose={onClose}>
      <DialogHeader onClose={onClose}>
        <FormattedMessage id="admin.security-policies.users.edit" />
      </DialogHeader>
      {isSuccess && (
        <>
          <BoxedList>
            {data.items.map((user) => (
              <BoxedList.CheckableItem
                key={user.id}
                checked={user.isAttached}
                onChange={() => {
                  if (user.isAttached) {
                    detachPolicy({
                      policyId,
                      userId: user.id,
                    });
                  } else {
                    attachPolicy({
                      policyId,
                      userId: user.id,
                    });
                  }
                }}
              >
                {user.username}
              </BoxedList.CheckableItem>
            ))}
          </BoxedList>
          {data.total > limit && (
            <PaginationToolbar
              className="mt-4"
              limit={limit}
              skip={skip}
              total={data.total}
              onChange={setSkip}
            />
          )}
        </>
      )}
    </DialogWithBackdrop>
  );
}
