import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { Card } from "../../../../../../../components/card/card";
import Heading from "../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { ChevronRightIcon } from "../../../../../../../icons/chevron-right.icon";
import { EditIcon } from "../../../../../../../icons/edit.icon";
import { useGetUsersForUserGroupQuery } from "../../../../../../../store/api/resources/users/users.api";
import { EditUserGroupMembersDialog } from "./edit-user-group-members.dialog";

export interface UserGroupUserListProps {
  groupId: string;
}

export function UserGroupMemberList({ groupId }: UserGroupUserListProps) {
  const navigate = useNavigate();
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isSuccess } = useGetUsersForUserGroupQuery({
    groupId,
    skip,
    limit,
  });

  return (
    <>
      <EditUserGroupMembersDialog
        groupId={groupId}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <Card>
        <div className="mb-4 flex items-center">
          <Heading level={2}>
            <FormattedMessage id="admin.user-groups.members" />
          </Heading>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="ml-auto flex items-center justify-center"
          >
            <EditIcon className="h-6 w-6 fill-black" />
            <span className="sr-only">
              <FormattedMessage id="admin.user-groups.members.edit" />
            </span>
          </button>
        </div>
        {isSuccess && (
          <>
            {data.items.length > 0 && (
              <BoxedList>
                {data.items.map((user) => {
                  const userUrl = `/administration/users/${user.id}`;
                  return (
                    <BoxedList.Item
                      key={user.id}
                      className="py-2 pl-4 pr-2"
                      onClick={() => navigate(userUrl)}
                    >
                      {user.username}
                      <Link to={userUrl} className="ml-auto">
                        <span className="sr-only">
                          <FormattedMessage id="admin.user-groups.members.details" />
                        </span>
                        <ChevronRightIcon className="h-6 w-6 fill-black/50" />
                      </Link>
                    </BoxedList.Item>
                  );
                })}
              </BoxedList>
            )}
            {data.items.length === 0 && (
              <p className="rounded-sm border border-black/30 p-6 text-center text-black/30">
                <FormattedMessage id="admin.user-groups.members.empty" />
              </p>
            )}
            {data.total > limit && (
              <PaginationToolbar
                skip={data.skip}
                limit={data.limit}
                total={data.total}
                onChange={setSkip}
              />
            )}
          </>
        )}
      </Card>
    </>
  );
}
