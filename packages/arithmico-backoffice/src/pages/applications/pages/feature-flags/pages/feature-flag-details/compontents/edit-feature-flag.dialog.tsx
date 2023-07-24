import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DialogHeader } from "../../../../../../../components/dialog-header/dialog-header";
import { DialogWithBackdrop } from "../../../../../../../components/dialog-with-backdrop/dialog-with-backdrop";
import { FormCancelButton } from "../../../../../../../components/form-cancel-button/form-cancel-button";
import FormError from "../../../../../../../components/form-error/form-error";
import FormLabel from "../../../../../../../components/form-label/form-label";
import FormSubmitButton from "../../../../../../../components/form-submit-button/form-submit-button";
import FormTextField from "../../../../../../../components/form-text-field/form-text-field";
import {
  updateFeatureFlagSchema,
  UpdateFeatureFlagSchemaType,
} from "../../../../../../../schemas/update-feature-flag/update-feature-flag.schema";
import {
  useGetFeatureFlagByIdQuery,
  useUpdateFeatureFlagMutation,
} from "../../../../../../../store/api/resources/feature-flags/feature-flags.api";

export interface EditFeatureFlagDialogProps {
  flagId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EditFeatureFlagDialog({
  flagId,
  isOpen,
  onClose,
}: EditFeatureFlagDialogProps) {
  const { isSuccess: featureFlagIsSuccess, data: FeatureFlag } =
    useGetFeatureFlagByIdQuery({ flagId });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateFeatureFlagSchemaType>({
    resolver: zodResolver(updateFeatureFlagSchema),
    defaultValues: {
      name: FeatureFlag?.name,
    },
  });
  const [trigger, result] = useUpdateFeatureFlagMutation();
  const internalOnClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  useEffect(() => {
    if (featureFlagIsSuccess) {
      setValue("name", FeatureFlag.name);
    }
  }, [featureFlagIsSuccess, FeatureFlag, setValue]);

  useEffect(() => {
    if (result.isSuccess) {
      internalOnClose();
    }
  }, [internalOnClose, result]);

  if (!featureFlagIsSuccess) {
    return <></>;
  }

  return (
    <DialogWithBackdrop isOpen={isOpen} onClose={internalOnClose}>
      <DialogHeader onClose={onClose}>Funktion bearbeiten</DialogHeader>
      <form
        onSubmit={handleSubmit((values) => {
          trigger({
            flagId,
            name: values.name,
            disabledSinceVersionTagId: values.disabledSinceVersionTagId,
          });
        })}
      >
        <FormLabel>
          Name
          <FormTextField {...register("name", {})} />
        </FormLabel>
        <FormError error={errors.name} />

        <div className="mt-8 flex">
          <FormCancelButton onClick={internalOnClose} />
          <FormSubmitButton className="ml-auto">Speichern</FormSubmitButton>
        </div>
      </form>
    </DialogWithBackdrop>
  );
}
