import { z } from "zod";

export const updateFeatureFlagSchema = z.object({
  name: z
    .string({ required_error: "common.form.errors.required" })
    .min(1, "common.form.errors.required"),

  disabledSinceVersionTagId: z
    .string({ required_error: "common.form.errors.required" })
    .min(1, "common.form.errors.required")
    .optional(),
});

export type UpdateFeatureFlagSchemaType = z.infer<
  typeof updateFeatureFlagSchema
>;
