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
} from "./security.types";

const authApi = api.injectEndpoints({
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
  }),
});

export const {
  useGetSecurityPolicesQuery,
  useGetSecurityPolicyByIdQuery,
  useGetAvailableSecurityAttributesQuery,
  useSetSecurityPolicyAttributesMutation,
  useRenameSecurityPolicyMutation,
  useCreateSecurityPolicyMutation,
} = authApi;
