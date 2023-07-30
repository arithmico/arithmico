import { api } from "../../api";
import { CredentialsDto, LoginDto, SecurityAttributesDto } from "./auth.types";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSecurityAttributes: build.query<SecurityAttributesDto, void>({
      query: () => ({
        url: "/auth/security-attributes",
        method: "GET",
      }),
      providesTags: ["SecurityAttribute"],
    }),

    login: build.mutation<CredentialsDto, LoginDto>({
      query: (arg) => ({
        url: "/auth/login",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["SecurityAttribute"],
    }),
  }),
});

export const { useLoginMutation, useGetSecurityAttributesQuery } = authApi;
