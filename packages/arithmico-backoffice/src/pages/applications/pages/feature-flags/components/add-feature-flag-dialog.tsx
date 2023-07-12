import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { FormattedMessage } from "react-intl";
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
      result.reset();
      onClose();
    }
  }, [result, onClose]);

  return (
    <DialogWithBackdrop isOpen={isOpen} onClose={onClose}>
      <DialogHeader onClose={onClose}>
        <FormattedMessage id="versions.feature-flags.add" />
      </DialogHeader>
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
            <legend className="mb-2">
              <FormattedMessage id="versions.feature-flags.type" />
            </legend>
            <div className="grid grid-cols-5 gap-4">
              <FeatureFlagTypeVariant
                label={
                  <FormattedMessage id="versions.feature-flags.type.function" />
                }
                register={register}
                value={FeatureFlagType.Function}
              />

              <FeatureFlagTypeVariant
                label={
                  <FormattedMessage id="versions.feature-flags.type.method" />
                }
                register={register}
                value={FeatureFlagType.Method}
              />

              <FeatureFlagTypeVariant
                label={
                  <FormattedMessage id="versions.feature-flags.type.constant" />
                }
                register={register}
                value={FeatureFlagType.Constant}
              />

              <FeatureFlagTypeVariant
                label={
                  <FormattedMessage id="versions.feature-flags.type.operator" />
                }
                register={register}
                value={FeatureFlagType.Operator}
              />

              <FeatureFlagTypeVariant
                label={
                  <FormattedMessage id="versions.feature-flags.type.type" />
                }
                register={register}
                value={FeatureFlagType.Type}
              />
            </div>
          </fieldset>
          <FormError error={errors.type} />
          <FormLabel>
            <FormattedMessage id="versions.feature-flags.name" />
            <FormTextField {...register("name")} />
          </FormLabel>
          <FormError error={errors.name} />

          <FormLabel>
            <FormattedMessage id="versions.feature-flags.flag" />
            <FormTextField {...register("flag")} />
          </FormLabel>
          <FormError error={errors.flag} />

          <fieldset>
            <div className="mb-2 flex items-center">
              <legend>
                <FormattedMessage id="versions.feature-flags.enabled-since-version" />
              </legend>
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
                      <span className="w-full rounded-sm border border-black/20 px-4 py-2 font-bold text-black/50 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:text-white">
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
        className="w-full border border-black/20 px-4 py-2 font-bold text-black/50 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:text-white"
      >
        {label}
      </span>
    </label>
  );
}
