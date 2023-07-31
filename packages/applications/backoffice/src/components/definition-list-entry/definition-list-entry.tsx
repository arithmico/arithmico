import classNames from "classnames";
import { ReactNode } from "react";

interface DefinitionListEntryProps {
  label: ReactNode;
  value: ReactNode;
}

export function DefinitionListEntry({
  label,
  value,
}: DefinitionListEntryProps) {
  return (
    <>
      <dt
        className={classNames("break-words", "max-w-full", "overflow-hidden")}
      >
        {label}
      </dt>
      <dd
        className={classNames("break-words", "max-w-full", "overflow-hidden")}
      >
        {value}
      </dd>
    </>
  );
}
