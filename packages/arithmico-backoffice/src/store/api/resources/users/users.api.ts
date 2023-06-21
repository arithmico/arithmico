import { api } from "../../api";
import { PagedResponse } from "../../types";
import { SecurityPolicyDto } from "../security-policies/security-policies.types";
import {
  ActivateUserArgs,
  CreateUserArgs,
  GetSecurityPoliciesAttachedToUserArgs,
  GetUserByIdArgs,
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

    getUserById: build.query<UserDto, GetUserByIdArgs>({
      query: (arg) => ({
        url: `/users/${arg.userId}`,
        method: "GET",
      }),
      providesTags: (arg, error) =>
        error ? [] : [{ type: "User", id: arg?.id }],
    }),

    getSecurityPoliciesAttachedToUser: build.query<
      SecurityPolicyDto[],
      GetSecurityPoliciesAttachedToUserArgs
    >({
      query: (arg) => ({
        url: `/users/${arg.userId}/security-policies`,
        method: "GET",
      }),
      providesTags: (response, error) =>
        response && !error
          ? response.map((policy) => ({
              type: "SecurityPolicy" as const,
              id: policy.id,
            }))
          : [],
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
  useGetUserByIdQuery,
  useGetSecurityPoliciesAttachedToUserQuery,
  useCreateUserMutation,
  useActivateUserMutation,
} = authApi;
