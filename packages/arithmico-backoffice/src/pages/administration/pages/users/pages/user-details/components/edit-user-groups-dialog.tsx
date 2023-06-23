import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Card } from "../../../../../../../components/card/card";
import { Checkbox } from "../../../../../../../components/checkbox/checkbox";
import Heading from "../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { CloseIcon } from "../../../../../../../icons/close.icon";
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
    <Dialog open={isOpen} onClose={onClose} className="absolute inset-0">
      <div className="flex h-full w-full flex-col items-center justify-center bg-black/30">
        <Dialog.Panel className="max-h-[90%] w-full max-w-3xl">
          <Card>
            <div className="mb-4 flex items-center">
              <Heading level={2}>
                <FormattedMessage id="admin.users.user-groups.edit" />
              </Heading>
              <button className="ml-auto" onClick={() => onClose()}>
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
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
          </Card>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
