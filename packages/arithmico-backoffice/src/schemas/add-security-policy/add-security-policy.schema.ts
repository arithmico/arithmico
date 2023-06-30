import { z } from "zod";

export const addSecurityPolicySchema = z.object({
  name: z
    .string({ required_error: "common.form.errors.required" })
    .min(1, "common.form.errors.required")
    .refine((arg) => !arg.includes(" "), "common.form.errors.no-whitespace"),
  attributes: z.array(z.string()),
});

export type AddSecurityPolicySchemaType = z.infer<
  typeof addSecurityPolicySchema
>;
