import { z } from "zod";

export const dispatchConfigurationBuildJobSchema = z.object({
  versionTagId: z
    .string({ required_error: "common.form.errors.required" })
    .min(1, "common.form.errors.required"),
});

export type DispatchConfigurationBuildJobSchemaType = z.infer<
  typeof dispatchConfigurationBuildJobSchema
>;
