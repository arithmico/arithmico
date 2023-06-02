import { api } from "../../api";
import { PagedResponse } from "../../types";
import { GetSecurityPoliciesArgs, SecurityPolicyDto } from "./security.types";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSecurityPolices: build.query<
      PagedResponse<SecurityPolicyDto>,
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
  }),
});

export const { useGetSecurityPolicesQuery } = authApi;
