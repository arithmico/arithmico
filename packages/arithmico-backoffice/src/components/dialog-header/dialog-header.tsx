import { ReactNode } from "react";
import { CloseIcon } from "../../icons/close.icon";

export interface DialogHeaderProps {
  children: ReactNode;
  onClose: () => void;
}

export function DialogHeader({ children, onClose }: DialogHeaderProps) {
  return (
    <div className="mb-44 flex items-center">
      {children}
      <button className="ml-auto" onClick={() => onClose()}>
        <CloseIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
