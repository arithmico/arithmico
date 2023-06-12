import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({ required_error: "common.form.errors.required" })
    .min(1, "common.form.errors.required"),

  password: z
    .string({ required_error: "common.form.errors.required" })
    .min(1, "common.form.errors.required"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
