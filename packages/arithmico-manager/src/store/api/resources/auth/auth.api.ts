import { api } from "../../api";
import { CredentialsDto, LoginDto } from "./auth.types";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<CredentialsDto, LoginDto>({
      query: (arg) => ({
        url: "/auth/login",
        method: "POST",
        body: arg,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
