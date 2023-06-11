import { z } from "zod";

export const renameUserGroupSchema = z.object({
  name: z
    .string({ required_error: "common.form.errors.required" })
    .min(1, "common.form.errors.required")
    .refine((arg) => !arg.includes(" "), "common.form.errors.no-whitespace"),
});

export type RenameUserGroupSchemaType = z.infer<typeof renameUserGroupSchema>;
