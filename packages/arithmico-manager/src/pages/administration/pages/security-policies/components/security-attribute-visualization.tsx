import classNames from "classnames";
import { ChevronRightIcon } from "../../../../../icons/chevron-right.icon";

export interface SecurityAttributeVisualizationProps {
  securityAttribute: string;
}

export function SecurityAttributeVisualization({
  securityAttribute,
}: SecurityAttributeVisualizationProps) {
  const segments = securityAttribute.split(":");

  return (
    <>
      <span className="sr-only">{securityAttribute}</span>
      {segments.map((segment, index) => (
        <span
          aria-hidden
          key={index}
          className={classNames("flex", "items-center")}
        >
          {index !== 0 && (
            <ChevronRightIcon
              className={classNames("w-4", "h-4", "fill-neutral-500", "mx-1")}
            />
          )}
          {segment}
        </span>
      ))}
    </>
  );
}
