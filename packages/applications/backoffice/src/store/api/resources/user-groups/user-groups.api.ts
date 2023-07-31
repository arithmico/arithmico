import { api } from "../../api";
import { PagedResponse, PageQueryParams } from "../../types";
import { SecurityPolicyDto } from "../security-policies/security-policies.types";
import {
  AttachSecurityPolicyToUserGroupArgs,
  CreateUserGroupArgs,
  DeleteUserGroupArgs,
  DetachSecurityPolicyToUserGroupArgs,
  GetSecurityPoliciesAttachedToUserGroupArgs,
  GetUserGroupByIdArgs,
  GetUserGroupsForSecurityPolicyArgs,
  GetUserGroupsForUserArgs,
  GetUserGroupsWithAttachmentCheckArgs,
  GetUserGroupsWithMembershipCheckArgs,
  RenameUserGroupArgs,
  UserGroupDto,
  UserGroupWithAttachmentCheckDto,
  UserGroupWithDetailsDto,
  UserGroupSecurityPolicyAttachmentDto,
  UserGroupWithMembershipCheckDto,
} from "./user-groups.types";

const userGroupsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserGroups: build.query<
      PagedResponse<UserGroupWithDetailsDto>,
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
      UserGroupWithDetailsDto,
      GetUserGroupByIdArgs
    >({
      query: (arg) => ({
        url: `/user-groups/${arg.groupId}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "UserGroup", id: result.id }] : [],
    }),

    getSecurityPoliciesAttachedToUserGroup: build.query<
      PagedResponse<SecurityPolicyDto>,
      GetSecurityPoliciesAttachedToUserGroupArgs
    >({
      query: (arg) => ({
        url: `/user-groups/${arg.groupId}/security-policies`,
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
      providesTags: (result, _, arg) =>
        result
          ? [
              ...result.items.map((securityPolicy) => ({
                type: "SecurityPolicy" as const,
                id: securityPolicy.id,
              })),
              { type: "UserGroup", id: arg.groupId },
            ]
          : [],
    }),

    getUserGroupsWithAttachmentCheck: build.query<
      PagedResponse<UserGroupWithAttachmentCheckDto>,
      GetUserGroupsWithAttachmentCheckArgs
    >({
      query: (arg) => ({
        url: "/user-groups",
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
          checkSecurityPolicyAttachment: arg.policyId,
        },
      }),
      providesTags: (result, _, arg) =>
        result
          ? [
              ...result.items.map((userGroup) => ({
                type: "UserGroup" as const,
                id: userGroup.id,
              })),
              { type: "SecurityPolicy", id: arg.policyId },
            ]
          : [],
    }),

    getUserGroupsWithMembershipCheck: build.query<
      PagedResponse<UserGroupWithMembershipCheckDto>,
      GetUserGroupsWithMembershipCheckArgs
    >({
      query: (arg) => ({
        url: "/user-groups",
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
          checkGroupMembership: arg.userId,
        },
      }),
      providesTags: (result, _, arg) =>
        result
          ? [
              ...result.items.map((userGroup) => ({
                type: "UserGroup" as const,
                id: userGroup.id,
              })),
              { type: "User", id: arg.userId },
            ]
          : [],
    }),

    getUserGroupsForSecurityPolicy: build.query<
      PagedResponse<UserGroupDto>,
      GetUserGroupsForSecurityPolicyArgs
    >({
      query: (arg) => ({
        url: `/security-policies/${arg.policyId}/user-groups`,
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
      providesTags: (result, _, arg) =>
        result
          ? [
              ...result.items.map((userGroup) => ({
                type: "UserGroup" as const,
                id: userGroup.id,
              })),
              { type: "SecurityPolicy", id: arg.policyId },
            ]
          : [],
    }),

    getUserGroupsForUser: build.query<
      PagedResponse<UserGroupDto>,
      GetUserGroupsForUserArgs
    >({
      query: (arg) => ({
        url: `/users/${arg.userId}/user-groups`,
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
      providesTags: (response, error, arg) =>
        response && !error
          ? [
              ...response.items.map((userGroup) => ({
                type: "UserGroup" as const,
                id: userGroup.id,
              })),
              { type: "User", id: arg.userId },
            ]
          : [],
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

    deleteUserGroup: build.mutation<void, DeleteUserGroupArgs>({
      query: (arg) => ({
        url: `/user-groups/${arg.groupId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, err, arg) =>
        !err ? [{ type: "UserGroup", id: arg.groupId }] : [],
    }),

    attachSecurityPolicyDtoUserGroup: build.mutation<
      UserGroupSecurityPolicyAttachmentDto,
      AttachSecurityPolicyToUserGroupArgs
    >({
      query: (arg) => ({
        url: `/user-groups/${arg.groupId}/security-policies/${arg.policyId}`,
        method: "PUT",
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: "SecurityPolicy", id: result.securityPolicyId },
              { type: "UserGroup", id: result.userGroupId },
            ]
          : [],
    }),

    detachSecurityPolicyDtoUserGroup: build.mutation<
      UserGroupSecurityPolicyAttachmentDto,
      DetachSecurityPolicyToUserGroupArgs
    >({
      query: (arg) => ({
        url: `/user-groups/${arg.groupId}/security-policies/${arg.policyId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: "SecurityPolicy", id: result.securityPolicyId },
              { type: "UserGroup", id: result.userGroupId },
            ]
          : [],
    }),
  }),
});

export const {
  useGetUserGroupsQuery,
  useGetUserGroupByIdQuery,
  useGetSecurityPoliciesAttachedToUserGroupQuery,
  useGetUserGroupsWithAttachmentCheckQuery,
  useGetUserGroupsForSecurityPolicyQuery,
  useGetUserGroupsForUserQuery,
  useGetUserGroupsWithMembershipCheckQuery,
  useCreateUserGroupMutation,
  useRenameUserGroupMutation,
  useDeleteUserGroupMutation,
  useAttachSecurityPolicyDtoUserGroupMutation,
  useDetachSecurityPolicyDtoUserGroupMutation,
} = userGroupsApi;
