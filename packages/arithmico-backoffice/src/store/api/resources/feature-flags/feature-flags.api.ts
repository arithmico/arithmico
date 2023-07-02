import { api } from "../../api";
import { CreateFeatureFlagArgs, FeatureFlagDto } from "./feature-flags.types";

const featureFlagsApi = api.injectEndpoints({
  endpoints: (build) => ({
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

export const { useCreateFeatureFlagMutation } = featureFlagsApi;
