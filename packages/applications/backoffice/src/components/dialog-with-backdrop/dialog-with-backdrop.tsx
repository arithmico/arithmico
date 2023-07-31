import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";
import { Card } from "../card/card";

export interface DialogWithBackdropProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export function DialogWithBackdrop({
  isOpen,
  onClose,
  children,
}: DialogWithBackdropProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="absolute inset-0">
      <div className="flex h-full w-full flex-col items-center justify-center bg-black/30">
        <Dialog.Panel className="max-h-[90%] w-full max-w-3xl">
          <Card className="flex h-full w-full max-w-5xl flex-col">
            {children}
          </Card>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
