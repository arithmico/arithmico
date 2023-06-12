import classNames from "classnames";
import React from "react";

interface HeadingProps {
  children?: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6 | "title";
  className?: string;
}

export default function Heading({
  children,
  level = 1,
  className,
}: HeadingProps) {
  switch (level) {
    case "title":
      return <h1 className={classNames("text-4xl", className)}>{children}</h1>;
    case 1:
      return <h1 className={classNames("text-2xl", className)}>{children}</h1>;
    case 2:
      return (
        <h2 className={classNames("text-2xl", "font-light", className)}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className={classNames("text-xl", "font-light", className)}>
          {children}
        </h3>
      );
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      // eslint-disable-next-line no-throw-literal
      throw `invalid heading level ${level}`;
  }
}
