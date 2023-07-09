import { api } from "../../api";
import { PagedResponse } from "../../types";
import {
  CreateFeatureFlagArgs,
  FeatureFlagDto,
  FeatureFlagWithVersionsDto,
  GetFeatureFlagByidArgs,
  GetFeatureFlagsArgs,
} from "./feature-flags.types";

const featureFlagsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFeatureFlags: build.query<
      PagedResponse<FeatureFlagWithVersionsDto>,
      GetFeatureFlagsArgs
    >({
      query: (arg) => ({
        url: "/feature-flags",
        method: "GET",
        params: {
          skip: arg.skip,
          limit: arg.limit,
        },
      }),
      providesTags: (response) =>
        response
          ? [
              ...response.items.map((featureFlag) => ({
                type: "FeatureFlag" as const,
                id: featureFlag.id,
              })),
            ]
          : [],
    }),

    getFeatureFlagById: build.query<
      FeatureFlagWithVersionsDto,
      GetFeatureFlagByidArgs
    >({
      query: (arg) => ({
        url: `/feature-flags/${arg.flagId}`,
        method: "GET",
      }),
      providesTags: (response) =>
        response ? [{ type: "FeatureFlag", id: response.id }] : [],
    }),

    createFeatureFlag: build.mutation<FeatureFlagDto, CreateFeatureFlagArgs>({
      query: (arg) => ({
        url: "/feature-flags",
        method: "POST",
        body: {
          type: arg.type,
          name: arg.name,
          flag: arg.flag,
          enabledSinceVersionTagId: arg.enabledSinceVersionTagId,
        },
      }),
      invalidatesTags: ["FeatureFlag"],
    }),
  }),
});

export const {
  useGetFeatureFlagsQuery,
  useGetFeatureFlagByIdQuery,
  useCreateFeatureFlagMutation,
} = featureFlagsApi;