import { z } from "zod";

export const activateUserSchema = z
  .object({
    password: z
      .string({ required_error: "common.form.errors.required" })
      .min(1, "common.form.errors.required")
      .min(8, "common.form.errors.min-password-length"),

    confirmPassword: z
      .string({ required_error: "common.form.errors.required" })
      .min(1, "common.form.errors.required"),
  })
  .refine((arg) => arg.password === arg.confirmPassword, {
    message: "common.form.errors.passwords-do-not-match",
    path: ["confirmPassword"],
  });

export type ActivateUserSchemaType = z.infer<typeof activateUserSchema>;
