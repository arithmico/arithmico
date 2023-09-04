import { api } from "../../api";
import { PagedResponse } from "../../types";
import {
  GetAvailableVersionTagsForConfigurationRevisionArgs,
  GetVersionTagByIdArgs,
  GetVersionTagsArgs,
  GetVersionTagsForFeatureFlagArgs,
  VersionTagDto,
} from "./version-tags.types";

const versionTagsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getVersionTags: build.query<
      PagedResponse<VersionTagDto>,
      GetVersionTagsArgs
    >({
      query: (arg) => ({
        url: "/version-tags",
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
      providesTags: (response) =>
        response
          ? [
              ...response.items.map((versionTag) => ({
                type: "VersionTag" as const,
                id: versionTag.id,
              })),
            ]
          : [],
    }),

    getVersionTagsForFeatureFlag: build.query<
      PagedResponse<VersionTagDto>,
      GetVersionTagsForFeatureFlagArgs
    >({
      query: (arg) => ({
        url: `/feature-flags/${arg.flagId}/version-tags`,
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
      providesTags: (response, _, arg) =>
        response
          ? [
              ...response.items.map((versionTag) => ({
                type: "VersionTag" as const,
                id: versionTag.id,
              })),
              { type: "FeatureFlag", id: arg.flagId },
            ]
          : [],
    }),

    getVersionTagById: build.query<VersionTagDto, GetVersionTagByIdArgs>({
      query: (arg) => ({
        url: `/version-tags/${arg.tagId}`,
        method: "GET",
      }),
      providesTags: (response) =>
        response ? [{ type: "VersionTag", id: response.id }] : [],
    }),

    getVersionTagsForConfigurationRevision: build.query<
      PagedResponse<VersionTagDto>,
      GetAvailableVersionTagsForConfigurationRevisionArgs
    >({
      query: (arg) => ({
        url: `/configurations/${arg.configurationId}/revisions/${arg.configurationRevisionId}/available-version-tags`,
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
        method: "GET",
      }),
      providesTags: (response, _, arg) =>
        response
          ? [
              ...response.items.map((versionTag) => ({
                type: "VersionTag" as const,
                id: versionTag.id,
              })),
              { type: "Configuration", id: arg.configurationId },
              {
                type: "ConfigurationRevision",
                id: arg.configurationRevisionId,
              },
            ]
          : [],
    }),
  }),
});

export const {
  useGetVersionTagsQuery,
  useGetVersionTagsForFeatureFlagQuery,
  useGetVersionTagByIdQuery,
  useGetVersionTagsForConfigurationRevisionQuery,
} = versionTagsApi;
