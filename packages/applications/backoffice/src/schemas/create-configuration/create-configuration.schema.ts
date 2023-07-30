import { z } from "zod";

export const createConfigurationSchema = z.object({
  name: z
    .string({ required_error: "common.form.errors.required" })
    .min(1, "common.form.errors.required")
    .refine(
      (arg) => /^[a-zA-Z0-9\-_]*$/.test(arg),
      "common.form.errors.no-whitespace"
    ),

  autoBuild: z.boolean({ required_error: "common.form.errors.required" }),
});

export type CreateConfigurationSchemaType = z.infer<
  typeof createConfigurationSchema
>;
