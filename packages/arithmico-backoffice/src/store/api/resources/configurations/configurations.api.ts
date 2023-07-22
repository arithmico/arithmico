import { api } from "../../api";
import { CreationResponse } from "../../common/creation-response";
import { PageQueryArgs } from "../../common/page-qeury-args";
import { PagedResponse } from "../../types";
import {
  CreateConfigurationArgs,
  ConfigurationWithRevisionsDto,
  GetConfigurationByIdArgs,
} from "./configurations.types";

const configurationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getConfigurations: build.query<
      PagedResponse<ConfigurationWithRevisionsDto>,
      PageQueryArgs
    >({
      query: (arg) => ({
        url: "/configurations",
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
      providesTags: (response) =>
        response
          ? [
              ...response.items.map((item) => ({
                type: "Configuration" as const,
                id: item.id,
              })),
              "Configuration",
            ]
          : ["Configuration"],
    }),

    getConfigurationById: build.query<
      ConfigurationWithRevisionsDto,
      GetConfigurationByIdArgs
    >({
      query: (arg) => ({
        url: `/configurations/${arg.configurationId}`,
        method: "GET",
      }),
      providesTags: (response) =>
        response
          ? [{ type: "Configuration", id: response.id }]
          : ["Configuration"],
    }),

    createConfiguration: build.mutation<
      CreationResponse,
      CreateConfigurationArgs
    >({
      query: (arg) => ({
        url: "/configurations",
        method: "POST",
        body: {
          name: arg.name,
          autoBuild: arg.autoBuild,
        },
      }),
      invalidatesTags: ["Configuration"],
    }),
  }),
});

export const {
  useGetConfigurationsQuery,
  useGetConfigurationByIdQuery,
  useCreateConfigurationMutation,
} = configurationsApi;
