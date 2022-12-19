import { CalculatorRootState } from "@stores/calculator-store";
import React from "react";
import { useSelector } from "react-redux";
import useNumberFormat from "../../hooks/use-number-format";
import classNames from "classnames";

interface ManualSectionItemProps {
  synopsis: string;
  description: string;
  noCopy?: boolean;
}

export default function ManualSectionItem({
  synopsis,
  description,
  noCopy,
}: ManualSectionItemProps) {
  const copySynopsisOnClick = useSelector(
    (state: CalculatorRootState) => state.settings.copySynopsisOnClick
  );

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!noCopy && copySynopsisOnClick && e.button === 0) {
      navigator.clipboard.writeText(synopsis);
    }
  };

  const numberFormat = useNumberFormat();

  return (
    <>
      <dt
        className={classNames(
          "p-4",
          "text-xl",
          "border-t",
          "theme-dark:border-white/5",
          "theme-light:border-black/10"
        )}
        onClick={onClick}
      >
        {numberFormat === "de"
          ? synopsis
              .replaceAll(",", ";")
              .replaceAll(".", ",")
              .replaceAll(",,,", "...")
          : synopsis}
      </dt>
      <dd
        className={classNames(
          "p-4",
          "text-xl",
          "border-t",
          "theme-dark:border-white/5",
          "theme-light:border-black/10"
        )}
      >
        {description}
      </dd>
    </>
  );
}
