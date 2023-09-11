import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ConfigurationDto,
  GetConfigurationsArgs,
  PagedResponse,
} from "./api.types";

// @ts-ignore
export const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const contentApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,
  }),
  endpoints: (build) => ({
    getConfigurations: build.query<
      PagedResponse<ConfigurationDto>,
      GetConfigurationsArgs
    >({
      query: (arg) => ({
        url: "/cms/configurations",
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
    }),
  }),
});

export const { useGetConfigurationsQuery } = contentApi;
