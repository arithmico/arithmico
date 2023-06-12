import { api } from "../../api";
import { PagedResponse } from "../../types";
import { GetUsersArgs, UserResponseDto } from "./users.types";

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
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((item) => ({
                type: "User" as const,
                id: item.id,
              })),
              "User",
            ]
          : ["User"],
    }),
  }),
});

export const { useGetUsersQuery } = authApi;
