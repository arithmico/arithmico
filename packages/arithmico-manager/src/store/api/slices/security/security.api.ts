import { api } from "../../api";
import { PagedResponse } from "../../types";
import {
  GetSecurityPoliciesArgs,
  GetSecurityPolicyByIdArgs,
  GetSecurityPoliciesResponseDto,
  GetSecurityPolicyByIdResponseDto,
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
    }),
    getSecurityPolicyById: build.query<
      GetSecurityPolicyByIdResponseDto,
      GetSecurityPolicyByIdArgs
    >({
      query: (arg) => ({
        url: `/security-policies/${arg.policyId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSecurityPolicesQuery, useGetSecurityPolicyByIdQuery } =
  authApi;
