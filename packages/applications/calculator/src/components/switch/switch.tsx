import { Switch as HeadlessuiSwitch } from "@headlessui/react";
import classNames from "classnames";

interface SwitchProps {
  onChange: (enabled: boolean) => void;
  enabled: boolean;
  label: string;
}

export default function Switch({ label, enabled, onChange }: SwitchProps) {
  return (
    <li
      className={classNames(
        "flex",
        "items-center",
        "h-16",
        "bold-font:font-bold",
        "text-base",
        "sm:text-lg",
        "md:text-xl",
        "lg:text-2xl",
      )}
    >
      <HeadlessuiSwitch.Group>
        <HeadlessuiSwitch.Label>{label}</HeadlessuiSwitch.Label>
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
            "outline-2",
            "outline-none",
            "ui-focus-visible:outline-offset-2",
            "ui-focus-visible:theme-light:outline-black",
            "ui-focus-visible:theme-dark:outline-white",
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
              "h-14",
              "w-14",
              "absolute left-[-4%]",
              "transform",
              "rounded-full",
              "bg-white",
              "shadow-lg",
              "transition-transform",
              "duration-200",
              "ease-in-out",
            )}
          />
        </HeadlessuiSwitch>
      </HeadlessuiSwitch.Group>
    </li>
  );
}
