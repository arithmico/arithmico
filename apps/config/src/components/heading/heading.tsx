import classNames from "classnames";

interface HeadingProps {
  type?: 1 | 2 | 3 | 4 | 5;
  children?: React.ReactNode;
}

export default function Heading({ type, children }: HeadingProps) {
  if (!type) {
    return (
      <h1 className={classNames("bold-font:font-bold", "text-6xl")}>
        {children}
      </h1>
    );
  }

  switch (type) {
    case 1:
      return (
        <h1 className={classNames("bold-font:font-bold", "text-6xl")}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className={classNames("bold-font:font-bold", "text-5xl")}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className={classNames("bold-font:font-bold", "text-4xl")}>
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 className={classNames("bold-font:font-bold", "text-3xl")}>
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 className={classNames("bold-font:font-bold", "text-2xl")}>
          {children}
        </h5>
      );
  }
}
