import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { DialogHeader } from "../../../../../../../components/dialog-header/dialog-header";
import { DialogWithBackdrop } from "../../../../../../../components/dialog-with-backdrop/dialog-with-backdrop";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { useGetUserGroupsWithMembershipCheckQuery } from "../../../../../../../store/api/resources/user-groups/user-groups.api";
import {
  useAddUserToUserGroupMutation,
  useRemoveUserFromUserGroupMutation,
} from "../../../../../../../store/api/resources/users/users.api";

export interface EditUserGroupsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export function EditUserGroupsDialog({
  isOpen,
  onClose,
  userId,
}: EditUserGroupsDialogProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { isSuccess, data } = useGetUserGroupsWithMembershipCheckQuery({
    userId,
    skip,
    limit,
  });
  const [addUserToUserGroup] = useAddUserToUserGroupMutation();
  const [removeUserFromUserGroup] = useRemoveUserFromUserGroupMutation();

  return (
    <DialogWithBackdrop isOpen={isOpen} onClose={onClose}>
      <DialogHeader onClose={onClose}>
        <FormattedMessage id="administration.users.user-groups.edit" />
      </DialogHeader>
      {isSuccess && data && (
        <>
          <BoxedList>
            {data.items.map((group) => (
              <BoxedList.CheckableItem
                key={group.id}
                checked={group.isMember}
                onChange={() => {
                  if (group.isMember) {
                    removeUserFromUserGroup({
                      userId,
                      groupId: group.id,
                    });
                  } else {
                    addUserToUserGroup({
                      userId,
                      groupId: group.id,
                    });
                  }
                }}
              >
                {group.name}
              </BoxedList.CheckableItem>
            ))}
          </BoxedList>
          {data.total > limit && (
            <PaginationToolbar
              className="mt-8"
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
