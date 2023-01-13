import React from "react";
import { Switch as HeadlessuiSwitch } from "@headlessui/react";
import classNames from "classnames";

interface SwitchProps {
  onChange: (enabled: boolean) => void;
  enabled: boolean;
  label: string;
}

export default function Switch({
  label,
  enabled,
  onChange,
}: SwitchProps) {
  return (
    <div
      className={classNames(
        "flex",
        "items-center",
        "h-16",
        "theme-dark:bg-neutral-800",
        "theme-light:bg-neutral-200"
      )}
    >
      <HeadlessuiSwitch.Group>
        <HeadlessuiSwitch.Label className={classNames("text-2xl")}>
          {label}
        </HeadlessuiSwitch.Label>
        <HeadlessuiSwitch
          checked={enabled}
          onChange={onChange}
          className={classNames(
            {
              "bg-blue-800": enabled,
              "theme-dark:bg-neutral-700": !enabled,
              "theme-light:bg-neutral-300": !enabled,
            },
            "ml-auto",
            "relative",
            "inline-flex",
            "items-center",
            "h-10",
            "w-24",
            "shrink-0",
            "cursor-pointer",
            "rounded-full",
            "border-transparent",
            "transition-colors",
            "duration-200",
            "ease-in-out",
            "focus:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-white",
            "focus-visible:ring-opacity-75"
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classNames(
              {
                "translate-x-12": enabled,
                "translate-x-0": !enabled,
              },
              "pointer-events-none",
              "inline-block",
              "h-12",
              "w-12",
              "transform",
              "rounded-full",
              "bg-white",
              "shadow-lg",
              "transition",
              "duration-200",
              "ease-in-out"
            )}
          />
        </HeadlessuiSwitch>
      </HeadlessuiSwitch.Group>
    </div>
  );
}
