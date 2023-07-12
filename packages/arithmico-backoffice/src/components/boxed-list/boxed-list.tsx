import { ReactNode } from "react";
import { Checkbox } from "../checkbox/checkbox";

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
        "flex items-center rounded-sm border border-black/20 hover:cursor-pointer hover:bg-black/5 " +
        (className ?? "")
      }
    >
      {children}
    </li>
  );
}

export interface BoxedListCheckableItemProps {
  checked?: boolean;
  children?: ReactNode;
  onChange?: () => void;
}

function BoxedListCheckableItem({
  checked,
  children,
  onChange,
}: BoxedListCheckableItemProps) {
  return (
    <BoxedListItem>
      <label className="flex w-full items-center py-2 pl-4 pr-2">
        {children}
        <Checkbox className="ml-auto" checked={checked} onChange={onChange} />
      </label>
    </BoxedListItem>
  );
}

export const BoxedList = Object.assign(BoxedListRoot, {
  Item: BoxedListItem,
  CheckableItem: BoxedListCheckableItem,
});
