import classNames from "classnames";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { FormattedMessage } from "react-intl";
import { ChevronLeftIcon } from "../../icons/chevron-left.icon";
import { ChevronRightIcon } from "../../icons/chevron-right.icon";
import { FirstPageIcon } from "../../icons/first-page.icon";
import { LastPageIcon } from "../../icons/last-page.icon";

function getTotalPages(total: number, limit: number): number {
  const totalPages = Math.ceil(total / limit);
  if (!Number.isFinite(totalPages) || totalPages === 0) {
    return 1;
  }
  return totalPages;
}

function getCurrentPage(skip: number, limit: number): number {
  const currentPage = Math.floor(skip / limit) + 1;
  if (!Number.isFinite(currentPage)) {
    return 1;
  }
  return currentPage;
}

export interface PaginationToolbarProps {
  skip: number;
  limit: number;
  total: number;
  onChange: (skip: number) => void;
  className?: string;
}

export function SmallPaginationToolbar({
  skip,
  limit,
  total,
  onChange,
  className,
}: PaginationToolbarProps) {
  const totalPages = getTotalPages(total, limit);
  const currentPage = getCurrentPage(skip, limit);
  const lastPageSkip =
    total % limit === 0 ? total - limit : total - (total % limit);

  return (
    <div className={classNames("flex", "items-center", "gap-0", className)}>
      <PaginationButton
        onClick={() => onChange(Math.max(0, skip - limit))}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon />
        <span className="sr-only">
          <FormattedMessage id="pagination.previous-page" />
        </span>
      </PaginationButton>
      <PaginationButton
        onClick={() => onChange(Math.min(lastPageSkip, skip + limit))}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon />
        <span className="sr-only">
          <FormattedMessage id="pagination.next-page" />
        </span>
      </PaginationButton>
    </div>
  );
}

export function PaginationToolbar({
  skip,
  limit,
  total,
  onChange,
  className,
}: PaginationToolbarProps) {
  const totalPages = getTotalPages(total, limit);
  const currentPage = getCurrentPage(skip, limit);
  const lastPageSkip =
    total % limit === 0 ? total - limit : total - (total % limit);

  return (
    <div
      className={classNames(
        "flex",
        "justify-center",
        "items-center",
        "mt-2",
        className
      )}
    >
      <PaginationButton
        onClick={() => onChange(0)}
        disabled={currentPage === 1}
      >
        <FirstPageIcon />
        <span className="sr-only">
          <FormattedMessage id="pagination.first-page" />
        </span>
      </PaginationButton>
      <PaginationButton
        onClick={() => onChange(Math.max(0, skip - limit))}
        disabled={currentPage === 1}
        className={classNames("mr-4")}
      >
        <ChevronLeftIcon />
        <span className="sr-only">
          <FormattedMessage id="pagination.previous-page" />
        </span>
      </PaginationButton>
      <span>
        <FormattedMessage
          id="pagination.text"
          values={{
            currentPage,
            totalPages,
          }}
        />
      </span>
      <PaginationButton
        onClick={() => onChange(Math.min(lastPageSkip, skip + limit))}
        disabled={currentPage === totalPages}
        className={classNames("ml-4")}
      >
        <ChevronRightIcon />
        <span className="sr-only">
          <FormattedMessage id="pagination.next-page" />
        </span>
      </PaginationButton>
      <PaginationButton
        onClick={() => onChange(Math.max(lastPageSkip, 0))}
        disabled={currentPage === totalPages}
      >
        <LastPageIcon />
        <span className="sr-only">
          <FormattedMessage id="pagination.last-page" />
        </span>
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
      type="button"
      ref={ref}
      {...props}
      className={classNames(
        "[&>svg]:w-8",
        "[&>svg]:h-8",
        {
          "[&>svg]:fill-neutral-500": !props.disabled,
          "[&>svg]:fill-neutral-300": props.disabled,
          "[&>svg]:hover:fill-neutral-800": !props.disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
});
