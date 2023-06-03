import classNames from "classnames";
import { ReactNode } from "react";
import { ChevronRightIcon } from "../../icons/chevron-right.icon";

export interface BreadcrumbsProps {
  firstIcon?: ReactNode;
  items: ReactNode[];
}

export function Breadcrumbs({ firstIcon, items }: BreadcrumbsProps) {
  return (
    <>
      <nav className={classNames("mt-4")}>
        <ol className={classNames("flex")}>
          {items.map((item, index) => (
            <BreadcrumbsItem
              key={index}
              icon={
                index !== 0 ? (
                  <ChevronRightIcon
                    className={classNames(
                      "w-8",
                      "h-8",
                      "px-1",
                      "fill-neutral-500"
                    )}
                  />
                ) : (
                  firstIcon
                )
              }
              content={item}
            />
          ))}
        </ol>
      </nav>
    </>
  );
}

interface BreadcrumbsItemProps {
  icon?: ReactNode;
  content: ReactNode;
}

function BreadcrumbsItem({ icon, content }: BreadcrumbsItemProps) {
  return (
    <li
      className={classNames("flex", "items-center", "text-neutral-500", {
        "first:px-1": !!icon,
        "first:fill-neutral-500": !!icon,
      })}
    >
      {icon}
      {content}
    </li>
  );
}
