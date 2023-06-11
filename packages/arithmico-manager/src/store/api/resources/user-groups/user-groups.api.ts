import { api } from "../../api";
import { PagedResponse, PageQueryParams } from "../../types";
import {
  CreateUserGroupArgs,
  UserGroupDto,
  UserGroupDtoWithMembers,
} from "./user-groups.types";

const userGroupsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserGroups: build.query<
      PagedResponse<UserGroupDtoWithMembers>,
      PageQueryParams
    >({
      query: (arg) => ({
        url: "/user-groups",
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((item) => ({
                type: "UserGroup" as const,
                id: item.id,
              })),
              "UserGroup",
            ]
          : ["UserGroup"],
    }),
    createUserGroup: build.mutation<UserGroupDto, CreateUserGroupArgs>({
      query: (arg) => ({
        url: "/user-groups",
        method: "POST",
        body: {
          name: arg.name,
        },
      }),
      invalidatesTags: (result) => (result ? ["UserGroup"] : []),
    }),
  }),
});

export const { useGetUserGroupsQuery, useCreateUserGroupMutation } =
  userGroupsApi;
