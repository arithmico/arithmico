import { useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { ActionButton } from "../../../../../../../components/action-button/action-button";
import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { DialogHeader } from "../../../../../../../components/dialog-header/dialog-header";
import { DialogWithBackdrop } from "../../../../../../../components/dialog-with-backdrop/dialog-with-backdrop";
import { FormCancelButton } from "../../../../../../../components/form-cancel-button/form-cancel-button";
import { SmallPaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { SemanticVersion } from "../../../../../../../components/semantic-version/semantic-version";
import { useCreateConfigurationRevisionMutation } from "../../../../../../../store/api/resources/configurations/configurations.api";
import { useGetFeatureFlagsQuery } from "../../../../../../../store/api/resources/feature-flags/feature-flags.api";
import { useGetVersionTagsQuery } from "../../../../../../../store/api/resources/version-tags/version-tags.api";

export interface CreateConfigurationRevisionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  configurationId: string;
}

export function CreateConfigurationRevisionDialog({
  isOpen,
  onClose,
  configurationId,
}: CreateConfigurationRevisionDialogProps) {
  const featureFlagsLimit = 10;
  const versionTagsLimit = 10;
  const [featureFlagsSkip, setFeatureFlagsSkip] = useState(0);
  const [versionTagsSkip, setVersionTagsSkip] = useState(0);
  const [selectedFeatureFlags, setSelectedFeatureFlags] = useState<Set<string>>(
    new Set()
  );
  const [selectedVersionTagId, setSelectedVersionTagId] = useState<
    string | undefined
  >();
  const { isSuccess: featureFlagsIsSuccess, data: featureFlags } =
    useGetFeatureFlagsQuery({
      skip: featureFlagsSkip,
      limit: featureFlagsLimit,
    });
  const { isSuccess: versionTagsIsSuccess, data: versionTags } =
    useGetVersionTagsQuery({
      skip: versionTagsSkip,
      limit: versionTagsLimit,
    });

  const internalOnClose = useCallback(() => {
    setVersionTagsSkip(0);
    setFeatureFlagsSkip(0);
    setSelectedFeatureFlags(new Set());
    setSelectedVersionTagId(undefined);
    onClose();
  }, [
    setVersionTagsSkip,
    setFeatureFlagsSkip,
    setSelectedFeatureFlags,
    setSelectedVersionTagId,
    onClose,
  ]);

  const [createRevision, result] = useCreateConfigurationRevisionMutation();
  const onSubmit = () => {
    createRevision({
      configurationId,
      featureFlagIds: [...selectedFeatureFlags.values()],
      minimumVersionTagId: selectedVersionTagId!,
    });
  };

  useEffect(() => {
    if (result.isSuccess) {
      internalOnClose();
    }
  }, [result, internalOnClose]);

  if (!versionTagsIsSuccess || !featureFlagsIsSuccess) {
    return <></>;
  }

  return (
    <DialogWithBackdrop isOpen={isOpen} onClose={internalOnClose}>
      <DialogHeader onClose={internalOnClose}>
        <FormattedMessage id="applications.configurations.revisions.add" />
      </DialogHeader>
      <fieldset>
        <div className="flex items-center">
          <legend>
            <FormattedMessage id="applications.configurations.revisions.feature-flags" />
          </legend>
          {featureFlags.total > featureFlagsLimit && (
            <SmallPaginationToolbar
              className="ml-auto"
              skip={featureFlagsSkip}
              limit={featureFlagsLimit}
              total={featureFlags.total}
              onChange={setFeatureFlagsSkip}
            />
          )}
        </div>
        <BoxedList className="grid grid-cols-2">
          {featureFlags.items.map((item) => {
            const selected = selectedFeatureFlags.has(item.id);
            return (
              <BoxedList.CheckableItem
                key={item.id}
                checked={selected}
                onChange={() => {
                  const newFeatureFlags = new Set(selectedFeatureFlags);
                  if (selected) {
                    newFeatureFlags.delete(item.id);
                  } else {
                    newFeatureFlags.add(item.id);
                  }
                  setSelectedFeatureFlags(newFeatureFlags);
                }}
              >
                <div className="grid flex-1 grid-cols-[2fr_1fr_auto]">
                  <span className="min-w-0 max-w-full overflow-clip text-ellipsis">
                    {item.name}
                  </span>
                  <span className="text-black/50">
                    (
                    <FormattedMessage
                      id={`applications.feature-flags.type.${item.type}`}
                      defaultMessage={item.type}
                    />
                    )
                  </span>
                </div>
              </BoxedList.CheckableItem>
            );
          })}
        </BoxedList>
      </fieldset>
      <fieldset className="mt-4">
        <div className="flex items-center">
          <legend>
            <FormattedMessage id="applications.configurations.revisions.minimum-version" />
          </legend>
          <SmallPaginationToolbar
            className="ml-auto"
            skip={versionTagsSkip}
            limit={versionTagsLimit}
            total={versionTags.total}
            onChange={setVersionTagsSkip}
          />
        </div>
        <div className="grid grid-cols-5 gap-4">
          {versionTags.items.map((item) => {
            const selected = selectedVersionTagId === item.id;
            return (
              <div className="flex w-full" key={item.id}>
                <label className="flex w-full">
                  <span className="sr-only">
                    <SemanticVersion version={item.version} />
                  </span>
                  <input
                    type="radio"
                    className="peer sr-only"
                    value={item.id}
                    checked={selected}
                    onChange={() => {
                      if (!selected) {
                        setSelectedVersionTagId(item.id);
                      }
                    }}
                  />
                  <span className="w-full rounded-sm border border-black/20 px-4 py-2 font-bold text-black/50 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:text-white">
                    <SemanticVersion version={item.version} />
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
      <div className="mt-8 flex">
        <FormCancelButton onClick={internalOnClose}>
          <FormattedMessage id="common.cancel" />
        </FormCancelButton>
        <ActionButton
          disabled={!selectedVersionTagId || selectedFeatureFlags.size === 0}
          className="ml-auto pl-4"
          onClick={onSubmit}
        >
          <FormattedMessage id="common.save" />
        </ActionButton>
      </div>
    </DialogWithBackdrop>
  );
}
