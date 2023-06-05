import { api } from "../../api";
import { PagedResponse } from "../../types";
import {
  GetSecurityPoliciesArgs,
  GetSecurityPolicyByIdArgs,
  GetSecurityPoliciesResponseDto,
  GetSecurityPolicyByIdResponseDto,
  SetSecurityPolicyAttributesResponseDto,
  SetSecurityPolicyAttributesRequestDto,
} from "./security.types";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSecurityPolices: build.query<
      PagedResponse<GetSecurityPoliciesResponseDto>,
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
      GetSecurityPolicyByIdResponseDto,
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
  }),
});

export const {
  useGetSecurityPolicesQuery,
  useGetSecurityPolicyByIdQuery,
  useGetAvailableSecurityAttributesQuery,
  useSetSecurityPolicyAttributesMutation,
} = authApi;
