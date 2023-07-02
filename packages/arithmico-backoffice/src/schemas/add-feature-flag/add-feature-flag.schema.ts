import { z } from "zod";
import { FeatureFlagType } from "../../store/api/resources/feature-flags/feature-flags.types";

export const addFeatureFlagSchema = z.object({
  type: z.enum([
    FeatureFlagType.Constant,
    FeatureFlagType.Function,
    FeatureFlagType.Method,
  ]),

  name: z
    .string({ required_error: "common.form.errors.required" })
    .min(1, "common.form.errors.required"),

  flag: z
    .string({ required_error: "common.form.errors.required" })
    .min(1, "common.form.errors.required"),

  enabledSinceVersionTagId: z
    .string({ required_error: "common.form.errors.required" })
    .min(1, "common.form.errors.required"),
});

export type AddFeatureFlagSchemaType = z.infer<typeof addFeatureFlagSchema>;
