import React from "react";
import classNames from "classnames";

interface DefinitionListItemProps {
  name: string;
  definition: string;
}

export default function DefinitionListItem({
  name,
  definition,
}: DefinitionListItemProps) {
  return (
    <>
      <dt
        className={classNames(
          "text-3xl",
          "bold-font:font-bold",
          "font-light",
          "font-mono",
          "pl-8"
        )}
      >
        {name}
      </dt>
      <dd
        className={classNames(
          "text-3xl",
          "bold-font:font-bold",
          "font-light",
          "font-mono",
          "pl-20",
          "before:content-[':=']",
          "before:text-mono",
          "before:pr-8"
        )}
      >
        {definition}
      </dd>
    </>
  );
}
