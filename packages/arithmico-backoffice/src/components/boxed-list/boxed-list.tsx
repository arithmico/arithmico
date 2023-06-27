import { ReactNode } from "react";

export interface BoxedListProps {
  children?: ReactNode;
  className?: string;
}

function BoxedListRoot({ children, className }: BoxedListProps) {
  return (
    <ul className={"flex flex-col gap-1 " + (className ?? "")}>{children}</ul>
  );
}

export interface BoxedListItemProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

function BoxedListItem({ children, className, onClick }: BoxedListItemProps) {
  return (
    <li
      onClick={onClick}
      className={
        "flex items-center rounded-sm border border-black/30 hover:cursor-pointer hover:bg-black/5 " +
        (className ?? "")
      }
    >
      {children}
    </li>
  );
}

export const BoxedList = Object.assign(BoxedListRoot, {
  Item: BoxedListItem,
});
