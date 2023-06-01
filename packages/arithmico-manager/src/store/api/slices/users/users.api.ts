import { api } from "../../api";
import { PagedResponse } from "../../types";
import { GetUsersArgs, UserResponseDto } from "./types";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<PagedResponse<UserResponseDto>, GetUsersArgs>({
      query: (arg) => ({
        url: "/users",
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
    }),
  }),
});

export const { useGetUsersQuery } = authApi;
