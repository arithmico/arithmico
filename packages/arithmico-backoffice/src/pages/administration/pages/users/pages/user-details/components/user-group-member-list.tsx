import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { Card } from "../../../../../../../components/card/card";
import Heading from "../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { ChevronRightIcon } from "../../../../../../../icons/chevron-right.icon";
import { EditIcon } from "../../../../../../../icons/edit.icon";
import { useGetUserGroupsForUserQuery } from "../../../../../../../store/api/resources/user-groups/user-groups.api";
import { EditUserGroupsDialog } from "./edit-user-groups-dialog";

export interface UserGroupMemberListProps {
  userId: string;
}

export function UserGroupMemberList({ userId }: UserGroupMemberListProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isSuccess } = useGetUserGroupsForUserQuery({
    skip,
    limit,
    userId,
  });

  return (
    <>
      <EditUserGroupsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        userId={userId}
      />
      <Card>
        <div className="mb-4 flex items-center">
          <Heading level={2}>
            <FormattedMessage id="admin.users.user-groups" />
          </Heading>
          <button
            className="ml-auto flex items-center justify-center"
            onClick={() => setIsDialogOpen(true)}
          >
            <EditIcon className="h-6 w-6 fill-black" />
            <span className="sr-only">
              <FormattedMessage id="admin.users.user-groups.edit" />
            </span>
          </button>
        </div>
        {isSuccess && (
          <>
            {data.items.length === 0 && (
              <p className="rounded-sm border border-black/30 p-6 text-center text-black/30">
                <FormattedMessage id="admin.users.user-groups.empty" />
              </p>
            )}
            {data.items.length > 0 && (
              <BoxedList>
                {data.items.map((userGroup) => {
                  const userGroupUrl = `/administration/user-groups/${userGroup.id}`;
                  return (
                    <BoxedList.Item
                      key={userGroup.id}
                      onClick={() => navigate(userGroupUrl)}
                      className="py-2 pl-4 pr-2"
                    >
                      {userGroup.name}
                      <Link to={userGroupUrl} className="ml-auto">
                        <ChevronRightIcon className="h-6 w-6 fill-black/50" />
                      </Link>
                    </BoxedList.Item>
                  );
                })}
              </BoxedList>
            )}
            {true && (
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
      </Card>
    </>
  );
}
