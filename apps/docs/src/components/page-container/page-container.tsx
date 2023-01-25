import classNames from "classnames";
import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <div
      className={classNames(
        className,
        "z-0",
        "w-full",
        "h-full",
        "border-2",
        "border-blue-800"
      )}
    >
      <main>{children}</main>
    </div>
  );
}
