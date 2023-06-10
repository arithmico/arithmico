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
    }),
  }),
});

export const { useGetUserGroupsQuery } = userGroupsApi;
