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
  RenameUserGroupArgs,
  UserGroupDto,
  UserGroupDtoWithDetails,
  UserGroupSecurityPolicyAttachmentDto,
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
  useCreateUserGroupMutation,
  useRenameUserGroupMutation,
  useDeleteUserGroupMutation,
  useAttachSecurityPolicyDtoUserGroupMutation,
  useDetachSecurityPolicyDtoUserGroupMutation,
} = userGroupsApi;
