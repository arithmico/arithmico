import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { DialogHeader } from "../../../../../components/dialog-header/dialog-header";
import { DialogWithBackdrop } from "../../../../../components/dialog-with-backdrop/dialog-with-backdrop";
import FormError from "../../../../../components/form-error/form-error";
import FormLabel from "../../../../../components/form-label/form-label";
import FormSubmitButton from "../../../../../components/form-submit-button/form-submit-button";
import FormTextField from "../../../../../components/form-text-field/form-text-field";
import { SmallPaginationToolbar } from "../../../../../components/pagination-toolbar/pagination-toolbar";
import {
  addFeatureFlagSchema,
  AddFeatureFlagSchemaType,
} from "../../../../../schemas/add-feature-flag/add-feature-flag.schema";
import { useCreateFeatureFlagMutation } from "../../../../../store/api/resources/feature-flags/feature-flags.api";
import { FeatureFlagType } from "../../../../../store/api/resources/feature-flags/feature-flags.types";
import { useGetVersionTagsQuery } from "../../../../../store/api/resources/version-tags/version-tags.api";

export interface AddFeatureFlagDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddFeatureFlagDialog({
  isOpen,
  onClose,
}: AddFeatureFlagDialogProps) {
  const limit = 20;
  const [skip, setSkip] = useState(0);
  const { isSuccess, data } = useGetVersionTagsQuery({ skip, limit });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFeatureFlagSchemaType>({
    resolver: zodResolver(addFeatureFlagSchema),
  });
  const [createFeatureFlag, result] = useCreateFeatureFlagMutation();

  useEffect(() => {
    if (result.isSuccess) {
      onClose();
    }
  }, [result, onClose]);

  return (
    <DialogWithBackdrop isOpen={isOpen} onClose={onClose}>
      <DialogHeader onClose={onClose}>Funktion erstellen</DialogHeader>
      {isSuccess && (
        <form
          onSubmit={handleSubmit((values) =>
            createFeatureFlag({
              type: values.type,
              name: values.name,
              flag: values.flag,
              enabledSinceVersionTagId: values.enabledSinceVersionTagId,
            })
          )}
        >
          <fieldset className="mb-4 flex flex-col">
            <legend className="mb-2">Typ</legend>
            <div className="grid grid-cols-3 gap-4">
              <FeatureFlagTypeVariant
                label="Funktion"
                register={register}
                value={FeatureFlagType.Function}
              />

              <FeatureFlagTypeVariant
                label="Methode"
                register={register}
                value={FeatureFlagType.Method}
              />

              <FeatureFlagTypeVariant
                label="Konstante"
                register={register}
                value={FeatureFlagType.Constant}
              />
            </div>
          </fieldset>
          <FormError error={errors.type} />
          <FormLabel>
            Name
            <FormTextField {...register("name")} />
          </FormLabel>
          <FormError error={errors.name} />

          <FormLabel>
            Flag
            <FormTextField {...register("flag")} />
          </FormLabel>
          <FormError error={errors.flag} />

          <fieldset>
            <div className="mb-2 flex items-center">
              <legend>Minimale Version</legend>
              {data.total > limit && (
                <SmallPaginationToolbar
                  className="ml-auto"
                  skip={skip}
                  limit={limit}
                  total={data.total}
                  onChange={setSkip}
                />
              )}
            </div>
            <div className="grid grid-cols-5 gap-4">
              {data.items.map((versionTag) => {
                const versionString = `v${versionTag.version.major}.${versionTag.version.minor}.${versionTag.version.patch}`;
                return (
                  <div className="flex w-full" key={versionTag.id}>
                    <label className="flex w-full">
                      <span className="sr-only">{versionString}</span>
                      <input
                        type="radio"
                        className="peer sr-only"
                        value={versionTag.id}
                        {...register("enabledSinceVersionTagId")}
                      />
                      <span className="w-full rounded-sm border border-black/30 px-4 py-2 font-bold text-black/50 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:text-white">
                        {versionString}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          </fieldset>
          <FormError error={errors.enabledSinceVersionTagId} />

          <div className="mt-4 flex">
            <FormSubmitButton className="ml-auto">Speichern</FormSubmitButton>
          </div>
        </form>
      )}
    </DialogWithBackdrop>
  );
}

interface FeatureFlagTypeVariantProps {
  register: UseFormRegister<AddFeatureFlagSchemaType>;
  value: FeatureFlagType;
  label: ReactNode;
}

function FeatureFlagTypeVariant({
  register,
  value,
  label,
}: FeatureFlagTypeVariantProps) {
  return (
    <label className="flex w-full">
      <span className="sr-only">{label}</span>
      <input
        className="peer sr-only"
        type="radio"
        value={value}
        {...register("type")}
      />
      <span
        aria-hidden
        className="w-full border border-black/30 px-4 py-2 font-bold text-black/50 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:text-white"
      >
        {label}
      </span>
    </label>
  );
}
