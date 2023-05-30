import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { RootState } from "..";
import { login, logout } from "../slices/auth/auth.slice";

const AUTHORIZATION_HEADER_NAME = "Authorization";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const mutex = new Mutex();

const convertAccessTokenToHeaderString = (accessToken: string) =>
  `Bearer ${accessToken}`;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    if (headers.has(AUTHORIZATION_HEADER_NAME)) {
      return headers;
    }
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set(
        AUTHORIZATION_HEADER_NAME,
        convertAccessTokenToHeaderString(accessToken)
      );
    }

    return headers;
  },
});

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if ((result.error?.status as number) === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult: any = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
          },
          api,
          extraOptions
        );

        if (
          refreshResult.data &&
          typeof refreshResult.data === "object" &&
          typeof refreshResult.data.accessToken === "string"
        ) {
          const accessToken = refreshResult.data.accessToken;
          const headers = new Headers();
          headers.set(
            AUTHORIZATION_HEADER_NAME,
            convertAccessTokenToHeaderString(accessToken)
          );
          result = await baseQuery(
            typeof args === "string"
              ? args
              : {
                  ...args,
                  headers,
                },
            api,
            extraOptions
          );
          api.dispatch(
            login({
              accessToken,
              stayLoggedIn: true,
            })
          );
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customBaseQuery;
