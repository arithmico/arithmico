import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { DialogHeader } from "../../../../../../../components/dialog-header/dialog-header";
import { DialogWithBackdrop } from "../../../../../../../components/dialog-with-backdrop/dialog-with-backdrop";
import { useGetFeatureFlagsQuery } from "../../../../../../../store/api/resources/feature-flags/feature-flags.api";

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
  const [featureFlagsSkip, setFeatureFlagsSkip] = useState(0);
  const [selectedFeatureFlags, setSelectedFeatureFlags] = useState<Set<string>>(
    new Set()
  );
  const { isSuccess: featureFlagsIsSuccess, data: featureFlags } =
    useGetFeatureFlagsQuery({
      skip: featureFlagsSkip,
      limit: featureFlagsLimit,
    });

  return (
    <DialogWithBackdrop isOpen={isOpen} onClose={onClose}>
      <DialogHeader onClose={onClose}>
        <FormattedMessage id="applications.configurations.revisions.add" />
      </DialogHeader>
      {featureFlagsIsSuccess && (
        <>
          <BoxedList>
            {featureFlags.items.map((item) => {
              const selected = selectedFeatureFlags.has(item.id);
              return (
                <BoxedList.CheckableItem
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
                  {item.name}
                </BoxedList.CheckableItem>
              );
            })}
          </BoxedList>
        </>
      )}
    </DialogWithBackdrop>
  );
}
