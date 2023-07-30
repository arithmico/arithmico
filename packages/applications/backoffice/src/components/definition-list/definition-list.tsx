import classNames from "classnames";
import { ReactNode } from "react";

interface DefinitionListProps {
  children: ReactNode;
}

export function DefinitionList({ children }: DefinitionListProps) {
  return (
    <dl
      className={classNames(
        "grid",
        "grid-cols-[1fr_2fr]",
        "gap-x-8",
        "gap-y-1",
        "[&>dt]:font-bold",
        "[&>dt]:text-black/40",
        "max-w-full",
        "overflow-hidden"
      )}
    >
      {children}
    </dl>
  );
}
