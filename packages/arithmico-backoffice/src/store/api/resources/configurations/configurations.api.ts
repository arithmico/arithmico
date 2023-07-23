import { api } from "../../api";
import { CreationResponse } from "../../common/creation-response";
import { PageQueryArgs } from "../../common/page-qeury-args";
import { PagedResponse } from "../../types";
import {
  CreateConfigurationArgs,
  ConfigurationWithRevisionsDto,
  GetConfigurationByIdArgs,
  GetConfigurationRevisionsResponse,
  GetConfigurationRevisionsArgs,
  CreateConfigurationRevisionArgs,
} from "./configurations.types";

export const configurationsApi = api.injectEndpoints({
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

    getConfigurationRevisions: build.query<
      PagedResponse<GetConfigurationRevisionsResponse>,
      GetConfigurationRevisionsArgs
    >({
      query: (arg) => ({
        url: `/configurations/${arg.configurationId}/revisions`,
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
      providesTags: (response, _, arg) =>
        response
          ? [
              ...response.items.map((item) => ({
                type: "ConfigurationRevision" as const,
                id: item.id,
              })),
              { type: "Configuration", id: arg.configurationId },
            ]
          : ["Configuration", "ConfigurationRevision"],
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

    createConfigurationRevision: build.mutation<
      CreationResponse,
      CreateConfigurationRevisionArgs
    >({
      query: (arg) => ({
        url: `/configurations/${arg.configurationId}/revisions`,
        method: "POST",
        body: {
          featureFlagIds: arg.featureFlagIds,
          minimumVersionTagId: arg.minimumVersionTagId,
        },
      }),
      invalidatesTags: (response, _, arg) =>
        response
          ? [
              { type: "Configuration", id: arg.configurationId },
              "ConfigurationRevision",
            ]
          : [],
    }),
  }),
});

export const {
  useGetConfigurationsQuery,
  useGetConfigurationByIdQuery,
  useGetConfigurationRevisionsQuery,
  useCreateConfigurationMutation,
  useCreateConfigurationRevisionMutation,
} = configurationsApi;
