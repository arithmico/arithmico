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
        "py-4",
        "lg:py-14",
        "px-12",
        "2xl:px-[20%]",
        "overflow-hidden",
        "z-0"
      )}
    >
      {children}
    </div>
  );
}
