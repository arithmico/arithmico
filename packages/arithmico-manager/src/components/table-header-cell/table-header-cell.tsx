import classNames from "classnames";
import { forwardRef, HTMLProps } from "react";

export const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  HTMLProps<HTMLTableCellElement>
>(({ children, className }, ref) => {
  return (
    <th
      ref={ref}
      className={classNames(
        "font-bold",
        "text-left",
        "px-2",
        "py-1",
        className
      )}
    >
      {children}
    </th>
  );
});
