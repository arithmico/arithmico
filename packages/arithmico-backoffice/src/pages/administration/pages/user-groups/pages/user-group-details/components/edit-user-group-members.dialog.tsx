import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Card } from "../../../../../../../components/card/card";
import { Checkbox } from "../../../../../../../components/checkbox/checkbox";
import Heading from "../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { CloseIcon } from "../../../../../../../icons/close.icon";
import {
  useAddUserToUserGroupMutation,
  useGetUsersWithIsGroupMemberQuery,
  useRemoveUserFromUserGroupMutation,
} from "../../../../../../../store/api/resources/users/users.api";

export interface EditUserGroupMembersDialogProps {
  groupId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EditUserGroupMembersDialog({
  groupId,
  isOpen,
  onClose,
}: EditUserGroupMembersDialogProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { data, isSuccess } = useGetUsersWithIsGroupMemberQuery({
    skip,
    limit,
    groupId,
  });
  const [addUserToUserGroup] = useAddUserToUserGroupMutation();
  const [removeUserFromUserGroup] = useRemoveUserFromUserGroupMutation();

  return (
    <Dialog open={isOpen} onClose={onClose} className="absolute inset-0">
      <div className="flex h-full w-full flex-col items-center justify-center bg-black/30">
        <Dialog.Panel className="max-h-[90%] w-full max-w-3xl">
          <Card className="flex h-full w-full max-w-5xl flex-col">
            <div className="mb-4 flex items-center">
              <Heading level={2} className="w-full">
                <FormattedMessage id="admin.user-groups.members.edit" />
              </Heading>
              <button className="ml-auto" onClick={() => onClose()}>
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            {isSuccess && (
              <>
                <ul className="mb-auto flex flex-col gap-1 overflow-y-auto">
                  {data.items.map((user) => (
                    <li
                      key={user.id}
                      className="flex items-center rounded-sm border border-black/30 py-2 pl-4 pr-2 hover:bg-black/5"
                    >
                      <label className="flex w-full items-center">
                        {user.username}
                        <Checkbox
                          className="ml-auto"
                          checked={user.isGroupMember}
                          onChange={() => {
                            if (user.isGroupMember) {
                              removeUserFromUserGroup({
                                groupId,
                                userId: user.id,
                              });
                            } else {
                              addUserToUserGroup({
                                groupId,
                                userId: user.id,
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
                    skip={data.skip}
                    limit={data.limit}
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
