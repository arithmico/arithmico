import { api } from "../../api";
import { PagedResponse } from "../../types";
import {
  ActivateUserArgs,
  CreateUserArgs,
  GetUsersArgs,
  UserDto,
  UserResponseDto,
} from "./users.types";

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

    createUser: build.mutation<UserDto, CreateUserArgs>({
      query: (arg) => ({
        url: "/users",
        method: "POST",
        body: {
          username: arg.username,
          email: arg.email,
        },
      }),
      invalidatesTags: ["User"],
    }),

    activateUser: build.mutation<UserDto, ActivateUserArgs>({
      query: (arg) => ({
        url: "/users/activate",
        method: "POST",
        body: {
          activationId: arg.activationId,
          password: arg.password,
        },
      }),
      invalidatesTags: (response, error) =>
        error ? [] : [{ type: "User", id: response?.id }, "User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useActivateUserMutation,
} = authApi;
