import { api } from "../../api";
import { PagedResponse, PageQueryParams } from "../../types";
import { UserGroupDto } from "./user-groups.types";

const userGroupsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserGroups: build.query<PagedResponse<UserGroupDto>, PageQueryParams>({
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
  }),
});

export const { useGetUserGroupsQuery } = userGroupsApi;
