import { forwardRef, HTMLProps } from "react";

export const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLProps<HTMLTableRowElement>
>(({ children, className, ...props }, ref) => {
  return (
    <tr ref={ref} className="hover:bg-black/5" {...props}>
      {children}
    </tr>
  );
});
