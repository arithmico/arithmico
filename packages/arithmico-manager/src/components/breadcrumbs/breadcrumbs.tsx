import classNames from "classnames";
import { Children, ReactNode } from "react";
import { ChevronRightIcon } from "../../icons/chevron-right.icon";

export interface BreadcrumbsProps {
  firstIcon?: ReactNode;
  children: ReactNode;
}

export function Breadcrumbs({ firstIcon, children }: BreadcrumbsProps) {
  const items = Children.toArray(children);

  return (
    <>
      <nav className={classNames("mt-4")}>
        <ol className={classNames("flex", "h-8", "items-center")}>
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
                      "fill-neutral-400"
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
      className={classNames(
        "flex",
        "items-center",
        "text-neutral-500",
        "last:text-neutral-700",
        {
          "first:[&>*]:first:pl-0": !!icon,
          "[&>*]:first:px-1": !!icon,
          "[&>*]:first:fill-neutral-400": !!icon,
        }
      )}
    >
      {icon}
      {content}
    </li>
  );
}
