import classNames from "classnames";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { ChevronLeftIcon } from "../../icons/chevron-left.icon";
import { ChevronRightIcon } from "../../icons/chevron-right.icon";
import { FirstPageIcon } from "../../icons/first-page.icon";
import { LastPageIcon } from "../../icons/last-page.icon";

export interface PaginationToolbarProps {
  skip: number;
  limit: number;
  total: number;
  onChange: (skip: number) => void;
}

export function PaginationToolbar({
  skip,
  limit,
  total,
  onChange,
}: PaginationToolbarProps) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;
  const lastPageSkip =
    total % limit === 0 ? total - limit : total - (total % limit);

  return (
    <div
      className={classNames(
        "flex",
        "justify-center",
        "items-center",
        "mb-4",
        "mt-2"
      )}
    >
      <PaginationButton
        onClick={() => onChange(0)}
        disabled={currentPage === 1}
      >
        <FirstPageIcon />
      </PaginationButton>
      <PaginationButton
        onClick={() => onChange(Math.max(0, skip - limit))}
        disabled={currentPage === 1}
        className={classNames("mr-4")}
      >
        <ChevronLeftIcon />
      </PaginationButton>
      <span>
        Seite {currentPage} von {totalPages}
      </span>
      <PaginationButton
        onClick={() => onChange(Math.min(lastPageSkip, skip + limit))}
        disabled={currentPage === totalPages}
        className={classNames("ml-4")}
      >
        <ChevronRightIcon />
      </PaginationButton>
      <PaginationButton
        onClick={() => onChange(Math.max(lastPageSkip, 0))}
        disabled={currentPage === totalPages}
      >
        <LastPageIcon />
      </PaginationButton>
    </div>
  );
}

const PaginationButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={classNames(
        "[&>svg]:w-8",
        "[&>svg]:h-8",
        {
          "[&>svg]:fill-neutral-500": !props.disabled,
          "[&>svg]:fill-neutral-400": props.disabled,
          "[&>svg]:hover:fill-neutral-800": !props.disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
});
