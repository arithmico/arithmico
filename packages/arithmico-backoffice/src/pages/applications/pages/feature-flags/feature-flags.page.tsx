import { useState } from "react";
import { ActionButton } from "../../../../components/action-button/action-button";
import Heading from "../../../../components/heading/heading";
import { AddIcon } from "../../../../icons/add.icon";
import { AddFeatureFlagDialog } from "./components/add-feature-flag-dialog";

export function FeatureFlagsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <AddFeatureFlagDialog
        isOpen={isDialogOpen}
        onClose={() => {
          console.log("onClose");
          setIsDialogOpen(false);
        }}
      />
      <div className="my-4 flex items-center">
        <Heading level={1}>Funktionen</Heading>
        <ActionButton className="ml-auto" onClick={() => setIsDialogOpen(true)}>
          <AddIcon className="mr-2 h-6 w-6 fill-white" /> Hinzufügen
        </ActionButton>
      </div>
    </>
  );
}
