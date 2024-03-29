import { api } from "../../api";
import { PagedResponse } from "../../types";
import {
  ActivateUserArgs,
  AddUserToUserGroupArgs,
  AttachSecurityPolicyToUserArgs,
  CreateUserArgs,
  DetachSecurityPolicyFromUserArgs,
  GetUserByIdArgs,
  GetUsersArgs,
  GetUsersForSecurityPolicyArgs,
  GetUsersForUserGroupArgs,
  GetUsersWithIsGroupMemberArgs,
  GetUsersWithSecurityPolicyAttachmentCheckArgs,
  RemoveUserFromUserGroupArgs,
  UserDto,
  UserDtoWithIsGroupMember,
  UserDtoWithSecurityPolicyAttachmentCheck,
  UserGroupMembershipDto,
  UserResponseDto,
} from "./users.types";

const usersApi = api.injectEndpoints({
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
      providesTags: (response) =>
        response
          ? [
              ...response.items.map((item) => ({
                type: "User" as const,
                id: item.id,
              })),
              "User",
            ]
          : ["User"],
    }),

    getUsersWithIsGroupMember: build.query<
      PagedResponse<UserDtoWithIsGroupMember>,
      GetUsersWithIsGroupMemberArgs
    >({
      query: (arg) => ({
        url: "/users",
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
          checkGroupMembership: arg.groupId,
        },
      }),
      providesTags: (response) =>
        response
          ? [
              ...response.items.map((item) => ({
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

    getUsersForUserGroup: build.query<
      PagedResponse<UserDto>,
      GetUsersForUserGroupArgs
    >({
      query: (arg) => ({
        url: `/user-groups/${arg.groupId}/users`,
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
      providesTags: (response, _, arg) =>
        response
          ? [
              ...response.items.map((user) => ({
                type: "User" as const,
                id: user.id,
              })),
              { type: "UserGroup", id: arg.groupId },
            ]
          : [],
    }),

    getUsersForSecurityPolicy: build.query<
      PagedResponse<UserDto>,
      GetUsersForSecurityPolicyArgs
    >({
      query: (arg) => ({
        url: `/security-policies/${arg.policyId}/users`,
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
      providesTags: (response, _, arg) =>
        response
          ? [
              ...response.items.map((user) => ({
                type: "User" as const,
                id: user.id,
              })),
              { type: "SecurityPolicy", id: arg.policyId },
            ]
          : [],
    }),

    getUsersWithSecurityPolicyAttachmentCheck: build.query<
      PagedResponse<UserDtoWithSecurityPolicyAttachmentCheck>,
      GetUsersWithSecurityPolicyAttachmentCheckArgs
    >({
      query: (arg) => ({
        url: `/users`,
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
          checkSecurityPolicyAttachment: arg.policyId,
        },
      }),
      providesTags: (response, _, arg) =>
        response
          ? [
              ...response.items.map((user) => ({
                type: "User" as const,
                id: user.id,
              })),
              { type: "SecurityPolicy", id: arg.policyId },
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
  useGetUsersWithIsGroupMemberQuery,
  useGetUserByIdQuery,
  useGetUsersForUserGroupQuery,
  useGetUsersForSecurityPolicyQuery,
  useGetUsersWithSecurityPolicyAttachmentCheckQuery,
  useCreateUserMutation,
  useActivateUserMutation,
  useAttachSecurityPolicyToUserMutation,
  useDetachSecurityPolicyFromUserMutation,
  useAddUserToUserGroupMutation,
  useRemoveUserFromUserGroupMutation,
} = usersApi;
