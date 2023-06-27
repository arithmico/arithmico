import { ReactNode } from "react";
import { CloseIcon } from "../../icons/close.icon";
import Heading from "../heading/heading";

export interface DialogHeaderProps {
  children: ReactNode;
  onClose: () => void;
}

export function DialogHeader({ children, onClose }: DialogHeaderProps) {
  return (
    <div className="mb-4 flex items-center">
      <Heading level={2}>{children}</Heading>
      <button className="ml-auto" onClick={() => onClose()}>
        <CloseIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
