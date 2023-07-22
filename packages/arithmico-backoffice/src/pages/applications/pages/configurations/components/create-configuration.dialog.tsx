import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "../../../../../components/checkbox/checkbox";
import { DialogHeader } from "../../../../../components/dialog-header/dialog-header";
import { DialogWithBackdrop } from "../../../../../components/dialog-with-backdrop/dialog-with-backdrop";
import { FormCancelButton } from "../../../../../components/form-cancel-button/form-cancel-button";
import FormError from "../../../../../components/form-error/form-error";
import FormLabel from "../../../../../components/form-label/form-label";
import FormSubmitButton from "../../../../../components/form-submit-button/form-submit-button";
import FormTextField from "../../../../../components/form-text-field/form-text-field";
import {
  createConfigurationSchema,
  CreateConfigurationSchemaType,
} from "../../../../../schemas/create-configuration/create-configuration.schema";
import { useCreateConfigurationMutation } from "../../../../../store/api/resources/configurations/configurations.api";

export interface CreateConfigurationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateConfigurationDialog({
  isOpen,
  onClose,
}: CreateConfigurationDialogProps) {
  const [createConfiguration, result] = useCreateConfigurationMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateConfigurationSchemaType>({
    resolver: zodResolver(createConfigurationSchema),
  });

  useEffect(() => {
    if (result.isSuccess) {
      reset();
      onClose();
    }
  }, [reset, onClose, result]);

  return (
    <DialogWithBackdrop isOpen={isOpen} onClose={onClose}>
      <DialogHeader onClose={onClose}>Konfiguration erstellen</DialogHeader>
      <form
        onSubmit={handleSubmit((values) =>
          createConfiguration({
            name: values.name,
            autoBuild: values.autoBuild,
          })
        )}
      >
        <FormLabel>
          Name
          <FormTextField {...register("name")} />
        </FormLabel>
        <FormError error={errors.name} />
        <label className="flex items-center py-2">
          Automatische Builds
          <Checkbox {...register("autoBuild")} />
        </label>
        <FormError error={errors.autoBuild} />
        <div className="mt-8 flex">
          <FormCancelButton onClick={onClose} />
          <FormSubmitButton className="ml-auto">Speichern</FormSubmitButton>
        </div>
      </form>
    </DialogWithBackdrop>
  );
}
