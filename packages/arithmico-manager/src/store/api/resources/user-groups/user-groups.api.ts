import { api } from "../../api";
import { PagedResponse, PageQueryParams } from "../../types";
import {
  CreateUserGroupArgs,
  GetUserGroupByIdArgs,
  RenameUserGroupArgs,
  UserGroupDto,
  UserGroupDtoWithDetails,
} from "./user-groups.types";

const userGroupsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserGroups: build.query<
      PagedResponse<UserGroupDtoWithDetails>,
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

    getUserGroupById: build.query<
      UserGroupDtoWithDetails,
      GetUserGroupByIdArgs
    >({
      query: (arg) => ({
        url: `/user-groups/${arg.groupId}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "UserGroup", id: result.id }] : [],
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

    renameUserGroup: build.mutation<UserGroupDto, RenameUserGroupArgs>({
      query: (arg) => ({
        url: `/user-groups/${arg.groupId}/name`,
        method: "PUT",
        body: {
          name: arg.name,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "UserGroup", id: result.id }] : [],
    }),
  }),
});

export const {
  useGetUserGroupsQuery,
  useGetUserGroupByIdQuery,
  useCreateUserGroupMutation,
  useRenameUserGroupMutation,
} = userGroupsApi;
