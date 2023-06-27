import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Checkbox } from "../../../../../../../components/checkbox/checkbox";
import { DialogHeader } from "../../../../../../../components/dialog-header/dialog-header";
import { DialogWithBackdrop } from "../../../../../../../components/dialog-with-backdrop/dialog-with-backdrop";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { useGetUserGroupsQuery } from "../../../../../../../store/api/resources/user-groups/user-groups.api";
import { UserGroupDto } from "../../../../../../../store/api/resources/user-groups/user-groups.types";
import {
  useAddUserToUserGroupMutation,
  useRemoveUserFromUserGroupMutation,
} from "../../../../../../../store/api/resources/users/users.api";

export interface EditUserGroupsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userGroups: UserGroupDto[];
}

export function EditUserGroupsDialog({
  isOpen,
  onClose,
  userGroups,
  userId,
}: EditUserGroupsDialogProps) {
  const selectedIds = userGroups.map((group) => group.id);
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { isSuccess, data } = useGetUserGroupsQuery({ skip, limit });
  const [addUserToUserGroup] = useAddUserToUserGroupMutation();
  const [removeUserFromUserGroup] = useRemoveUserFromUserGroupMutation();

  return (
    <DialogWithBackdrop isOpen={isOpen} onClose={onClose}>
      <DialogHeader onClose={onClose}>
        <FormattedMessage id="admin.users.user-groups.edit" />
      </DialogHeader>

      {isSuccess && data && (
        <>
          <ul className="flex flex-col gap-1">
            {data.items.map((group) => (
              <li
                key={group.id}
                className="flex items-center rounded-sm border border-black/30 py-2 pl-4 pr-2 hover:bg-black/5"
              >
                <label className="flex w-full items-center">
                  {group.name}
                  <Checkbox
                    checked={selectedIds.includes(group.id)}
                    className="ml-auto"
                    onChange={() => {
                      if (selectedIds.includes(group.id)) {
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
                  />
                </label>
              </li>
            ))}
          </ul>
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
