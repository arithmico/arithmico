import { DialogHeader } from "../../../../../components/dialog-header/dialog-header";
import { DialogWithBackdrop } from "../../../../../components/dialog-with-backdrop/dialog-with-backdrop";

export interface CreateConfigurationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateConfigurationDialog({
  isOpen,
  onClose,
}: CreateConfigurationDialogProps) {
  return (
    <DialogWithBackdrop isOpen={isOpen} onClose={onClose}>
      <DialogHeader onClose={onClose}>Konfiguration erstellen</DialogHeader>
    </DialogWithBackdrop>
  );
}
