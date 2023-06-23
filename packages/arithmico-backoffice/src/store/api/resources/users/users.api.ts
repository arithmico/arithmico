import { api } from "../../api";
import { PagedResponse } from "../../types";
import { SecurityPolicyDto } from "../security-policies/security-policies.types";
import { UserGroupDto } from "../user-groups/user-groups.types";
import {
  ActivateUserArgs,
  AddUserToUserGroupArgs,
  AttachSecurityPolicyToUserArgs,
  CreateUserArgs,
  DetachSecurityPolicyFromUserArgs,
  GetSecurityPoliciesAttachedToUserArgs,
  GetUserByIdArgs,
  GetUserGroupsForUserArgs,
  GetUsersArgs,
  RemoveUserFromUserGroupArgs,
  UserDto,
  UserGroupMembershipDto,
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

    getUserGroupsForUser: build.query<UserGroupDto[], GetUserGroupsForUserArgs>(
      {
        query: (arg) => ({
          url: `/users/${arg.userId}/user-groups`,
          method: "GET",
        }),
        providesTags: (response, error, arg) =>
          response && !error
            ? [
                ...response.map((userGroup) => ({
                  type: "UserGroup" as const,
                  id: userGroup.id,
                })),
                { type: "User", id: arg.userId },
              ]
            : [],
      }
    ),

    getSecurityPoliciesAttachedToUser: build.query<
      SecurityPolicyDto[],
      GetSecurityPoliciesAttachedToUserArgs
    >({
      query: (arg) => ({
        url: `/users/${arg.userId}/security-policies`,
        method: "GET",
      }),
      providesTags: (response, error, arg) =>
        response && !error
          ? [
              ...response.map((policy) => ({
                type: "SecurityPolicy" as const,
                id: policy.id,
              })),
              { type: "User", id: arg.userId },
            ]
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
        error ? [] : [{ type: "User", id: response?.id }],
    }),

    attachSecurityPolicyToUser: build.mutation<
      void,
      AttachSecurityPolicyToUserArgs
    >({
      query: (arg) => ({
        url: `/users/${arg.userId}/security-policies/${arg.policyId}`,
        method: "PUT",
      }),
      invalidatesTags: (_, error, arg) =>
        error
          ? []
          : [
              { type: "User", id: arg.userId },
              { type: "SecurityPolicy", id: arg.policyId },
            ],
    }),

    detachSecurityPolicyFromUser: build.mutation<
      void,
      DetachSecurityPolicyFromUserArgs
    >({
      query: (arg) => ({
        url: `/users/${arg.userId}/security-policies/${arg.policyId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, error, arg) =>
        error
          ? []
          : [
              { type: "User", id: arg.userId },
              { type: "SecurityPolicy", id: arg.policyId },
            ],
    }),

    addUserToUserGroup: build.mutation<
      UserGroupMembershipDto,
      AddUserToUserGroupArgs
    >({
      query: (arg) => ({
        url: `/users/${arg.userId}/user-groups/${arg.groupId}`,
        method: "PUT",
      }),
      invalidatesTags: (response, error) =>
        response && !error
          ? [
              {
                type: "User",
                id: response.userId,
              },
              {
                type: "UserGroup",
                id: response.groupId,
              },
            ]
          : [],
    }),

    removeUserFromUserGroup: build.mutation<
      UserGroupMembershipDto,
      RemoveUserFromUserGroupArgs
    >({
      query: (arg) => ({
        url: `/users/${arg.userId}/user-groups/${arg.groupId}`,
        method: "DELETE",
      }),
      invalidatesTags: (response, error) =>
        response && !error
          ? [
              {
                type: "User",
                id: response.userId,
              },
              {
                type: "UserGroup",
                id: response.groupId,
              },
            ]
          : [],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetUserGroupsForUserQuery,
  useGetSecurityPoliciesAttachedToUserQuery,
  useCreateUserMutation,
  useActivateUserMutation,
  useAttachSecurityPolicyToUserMutation,
  useDetachSecurityPolicyFromUserMutation,
  useAddUserToUserGroupMutation,
  useRemoveUserFromUserGroupMutation,
} = authApi;
