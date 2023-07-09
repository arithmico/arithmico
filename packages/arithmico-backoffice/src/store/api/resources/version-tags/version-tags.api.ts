import { api } from "../../api";
import { PagedResponse } from "../../types";
import {
  GetVersionTagsArgs,
  GetVersionTagsForFeatureFlag,
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
      GetVersionTagsForFeatureFlag
    >({
      query: (arg) => ({
        url: `/feature-flags/${arg.flagId}/version-tags`,
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
    }),
  }),
});

export const { useGetVersionTagsQuery, useGetVersionTagsForFeatureFlagQuery } =
  versionTagsApi;
