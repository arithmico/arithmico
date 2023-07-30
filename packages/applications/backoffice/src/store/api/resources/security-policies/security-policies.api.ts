import { api } from "../../api";
import { PagedResponse } from "../../types";
import {
  GetSecurityPoliciesArgs,
  GetSecurityPolicyByIdArgs,
  SecurityPolicyDtoWithPrincipalsCount,
  SecurityPolicyDtoWithPrincipalsDetails,
  SetSecurityPolicyAttributesResponseDto,
  SetSecurityPolicyAttributesRequestDto,
  SecurityPolicyDto,
  RenameSecurityPolicyArgs,
  CreateSecurityPolicyArgs,
  DeleteSecurityPolicyArgs,
  SecurityPolicyDtoWithAttachmentCheck,
  GetSecurityPoliciesWithAttachedToUserGroupCheckArgs,
  GetSecurityPoliciesWithAttachedToUserCheckArgs,
  GetSecurityPoliciesAttachedToUserArgs,
} from "./security-policies.types";

const securityPoliciesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSecurityPolices: build.query<
      PagedResponse<SecurityPolicyDtoWithPrincipalsCount>,
      GetSecurityPoliciesArgs
    >({
      query: (arg) => ({
        url: "/security-policies",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: "SecurityPolicy" as const,
                id,
              })),
              "SecurityPolicy",
            ]
          : ["SecurityPolicy"],
    }),

    getSecurityPoliciesWithAttachedToUserGroupCheck: build.query<
      PagedResponse<SecurityPolicyDtoWithAttachmentCheck>,
      GetSecurityPoliciesWithAttachedToUserGroupCheckArgs
    >({
      query: (arg) => ({
        url: "/security-policies",
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
          checkAttachedToUserGroup: arg.groupId,
        },
      }),
      providesTags: (response, _, arg) =>
        response
          ? [
              ...response.items.map((securityPolicy) => ({
                type: "SecurityPolicy" as const,
                id: securityPolicy.id,
              })),
              { type: "UserGroup", id: arg.groupId },
            ]
          : [],
    }),

    getSecurityPoliciesWithAttachedToUserCheck: build.query<
      PagedResponse<SecurityPolicyDtoWithAttachmentCheck>,
      GetSecurityPoliciesWithAttachedToUserCheckArgs
    >({
      query: (arg) => ({
        url: "/security-policies",
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
          checkAttachedToUser: arg.userId,
        },
      }),
      providesTags: (response, _, arg) =>
        response
          ? [
              ...response.items.map((securityPolicy) => ({
                type: "SecurityPolicy" as const,
                id: securityPolicy.id,
              })),
              { type: "User", id: arg.userId },
            ]
          : [],
    }),

    getSecurityPolicyById: build.query<
      SecurityPolicyDtoWithPrincipalsDetails,
      GetSecurityPolicyByIdArgs
    >({
      query: (arg) => ({
        url: `/security-policies/${arg.policyId}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "SecurityPolicy", id: result.id }] : [],
    }),

    getAvailableSecurityAttributes: build.query<string[], void>({
      query: () => ({
        url: "/security-policies/available-attributes",
        mehtod: "GET",
      }),
    }),

    getSecurityPoliciesAttachedToUser: build.query<
      PagedResponse<SecurityPolicyDto>,
      GetSecurityPoliciesAttachedToUserArgs
    >({
      query: (arg) => ({
        url: `/users/${arg.userId}/security-policies`,
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
      providesTags: (response, error, arg) =>
        response && !error
          ? [
              ...response.items.map((policy) => ({
                type: "SecurityPolicy" as const,
                id: policy.id,
              })),
              { type: "User", id: arg.userId },
            ]
          : [],
    }),

    setSecurityPolicyAttributes: build.mutation<
      SetSecurityPolicyAttributesResponseDto,
      SetSecurityPolicyAttributesRequestDto
    >({
      query: (arg) => ({
        url: `/security-policies/${arg.policyId}/attributes`,
        method: "PUT",
        body: {
          attributes: arg.attributes,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "SecurityPolicy", id: result.id }] : [],
    }),

    renameSecurityPolicy: build.mutation<
      SecurityPolicyDto,
      RenameSecurityPolicyArgs
    >({
      query: (arg) => ({
        url: `/security-policies/${arg.policyId}/name`,
        method: "PUT",
        body: {
          name: arg.name,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "SecurityPolicy", id: result.id }] : [],
    }),

    createSecurityPolicy: build.mutation<
      SecurityPolicyDto,
      CreateSecurityPolicyArgs
    >({
      query: (arg) => ({
        url: `/security-policies`,
        method: "POST",
        body: {
          name: arg.name,
          attributes: arg.attributes,
        },
      }),
      invalidatesTags: ["SecurityPolicy"],
    }),

    deleteSecurityPolicy: build.mutation<void, DeleteSecurityPolicyArgs>({
      query: (arg) => ({
        url: `/security-policies/${arg.policyId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, err, arg) =>
        !err ? [{ type: "SecurityPolicy", id: arg.policyId }] : [],
    }),
  }),
});

export const {
  useGetSecurityPolicesQuery,
  useGetSecurityPolicyByIdQuery,
  useGetAvailableSecurityAttributesQuery,
  useSetSecurityPolicyAttributesMutation,
  useGetSecurityPoliciesWithAttachedToUserCheckQuery,
  useGetSecurityPoliciesWithAttachedToUserGroupCheckQuery,
  useGetSecurityPoliciesAttachedToUserQuery,
  useRenameSecurityPolicyMutation,
  useCreateSecurityPolicyMutation,
  useDeleteSecurityPolicyMutation,
} = securityPoliciesApi;
