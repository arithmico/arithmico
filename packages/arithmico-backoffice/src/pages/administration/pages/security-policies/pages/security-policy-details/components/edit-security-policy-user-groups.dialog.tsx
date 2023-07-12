import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { DialogHeader } from "../../../../../../../components/dialog-header/dialog-header";
import { DialogWithBackdrop } from "../../../../../../../components/dialog-with-backdrop/dialog-with-backdrop";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import {
  useAttachSecurityPolicyDtoUserGroupMutation,
  useDetachSecurityPolicyDtoUserGroupMutation,
  useGetUserGroupsWithAttachmentCheckQuery,
} from "../../../../../../../store/api/resources/user-groups/user-groups.api";

export interface EditSecurityPolicyUserGroupsDialogProps {
  policyId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EditSecurityPolicyUserGroupsDialog({
  policyId,
  isOpen,
  onClose,
}: EditSecurityPolicyUserGroupsDialogProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { isSuccess, data } = useGetUserGroupsWithAttachmentCheckQuery({
    skip,
    limit,
    policyId,
  });
  const [attachPolicy] = useAttachSecurityPolicyDtoUserGroupMutation();
  const [detachPolicy] = useDetachSecurityPolicyDtoUserGroupMutation();

  return (
    <DialogWithBackdrop isOpen={isOpen} onClose={onClose}>
      <DialogHeader onClose={onClose}>
        <FormattedMessage id="admin.security-policies.user-groups.edit" />
      </DialogHeader>
      {isSuccess && (
        <>
          {data.items.length > 0 && (
            <BoxedList>
              {data.items.map((userGroup) => (
                <BoxedList.CheckableItem
                  checked={userGroup.isAttached}
                  onChange={() => {
                    if (userGroup.isAttached) {
                      detachPolicy({ policyId, groupId: userGroup.id });
                    } else {
                      attachPolicy({ policyId, groupId: userGroup.id });
                    }
                  }}
                >
                  {userGroup.name}
                </BoxedList.CheckableItem>
              ))}
            </BoxedList>
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
        </>
      )}
    </DialogWithBackdrop>
  );
}
