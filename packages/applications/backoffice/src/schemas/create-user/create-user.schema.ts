import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string({ required_error: "common.form.errors.required" })
    .min(1, "common.form.errors.required")
    .refine((arg) => !arg.includes(" "), "common.form.errors.no-whitespace"),

  email: z
    .string({ required_error: "common.form.errors.required" })
    .email("common.form.errors.invalid-email"),
});

export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
