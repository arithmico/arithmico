import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { DialogHeader } from "../../../../../../../../../components/dialog-header/dialog-header";
import { DialogWithBackdrop } from "../../../../../../../../../components/dialog-with-backdrop/dialog-with-backdrop";
import { FormCancelButton } from "../../../../../../../../../components/form-cancel-button/form-cancel-button";
import FormError from "../../../../../../../../../components/form-error/form-error";
import FormSubmitButton from "../../../../../../../../../components/form-submit-button/form-submit-button";
import { SmallPaginationToolbar } from "../../../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { SemanticVersion } from "../../../../../../../../../components/semantic-version/semantic-version";
import {
  dispatchConfigurationBuildJobSchema,
  DispatchConfigurationBuildJobSchemaType,
} from "../../../../../../../../../schemas/dispatch-configuration-build-job/dispatch-configuration-build-job.schema";
import { useDispatchConfigurationBuildJobMutation } from "../../../../../../../../../store/api/resources/configurations/configurations.api";
import { useGetVersionTagsForConfigurationRevisionQuery } from "../../../../../../../../../store/api/resources/version-tags/version-tags.api";

export interface DispatchConfigurationRevisionBuildJobProps {
  isOpen: boolean;
  onClose: () => void;
  configurationId: string;
  configurationRevisionId: string;
}

export function DispatchConfigurationRevisionBuildJob({
  onClose,
  isOpen,
  configurationId,
  configurationRevisionId,
}: DispatchConfigurationRevisionBuildJobProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { data, isSuccess } = useGetVersionTagsForConfigurationRevisionQuery({
    configurationId,
    configurationRevisionId,
    skip,
    limit,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DispatchConfigurationBuildJobSchemaType>({
    resolver: zodResolver(dispatchConfigurationBuildJobSchema),
  });
  const internalOnClose = () => {
    onClose();
    reset();
  };
  const [triggerBuildJob, result] = useDispatchConfigurationBuildJobMutation();
  if (result.isSuccess) {
    internalOnClose();
    result.reset();
  }

  return (
    <DialogWithBackdrop isOpen={isOpen} onClose={internalOnClose}>
      <DialogHeader onClose={internalOnClose}>
        <FormattedMessage id="applications.configurations.revisions.actions.dispatch-build-job.title" />
      </DialogHeader>
      {isSuccess && (
        <form
          onSubmit={handleSubmit((data) => {
            triggerBuildJob({
              configurationId,
              configurationRevisionId,
              versionTagId: data.versionTagId,
            });
          })}
        >
          <fieldset>
            <div className="mb-2 flex items-center">
              <legend>
                <FormattedMessage id="applications.configurations.revisions.actions.dispatch-build-job.version" />
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
              {data.items.map((versionTag) => (
                <div className="flex w-full" key={versionTag.id}>
                  <label className="flex w-full">
                    <span className="sr-only">
                      <SemanticVersion version={versionTag.version} />
                    </span>
                    <input
                      type="radio"
                      className="peer sr-only"
                      value={versionTag.id}
                      {...register("versionTagId")}
                    />
                    <span className="w-full rounded-sm border border-black/20 px-4 py-2 font-bold text-black/50 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:text-white">
                      <SemanticVersion version={versionTag.version} />
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          <FormError error={errors.versionTagId} />
          <div className="mt-8 flex">
            <FormCancelButton onClick={internalOnClose}>
              <FormattedMessage id="common.cancel" />
            </FormCancelButton>
            <FormSubmitButton className="ml-auto">
              <FormattedMessage id="common.start" />
            </FormSubmitButton>
          </div>
        </form>
      )}
    </DialogWithBackdrop>
  );
}
