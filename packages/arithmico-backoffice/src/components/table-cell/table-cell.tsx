import classNames from "classnames";
import { forwardRef, HTMLProps } from "react";

export const TableCell = forwardRef<
  HTMLTableCellElement,
  HTMLProps<HTMLTableCellElement>
>(({ children, className, ...props }, ref) => {
  return (
    <td ref={ref} className={classNames("px-2", "py-1", className)} {...props}>
      {children}
    </td>
  );
});
