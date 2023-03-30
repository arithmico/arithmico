import { Listbox as HeadlessuiListbox } from "@headlessui/react";
import classNames from "classnames";
import { ExpandMore, DoneIcon } from "@arithmico/frontend-components";

interface ListboxProps {
  label: string;
  value: string | number;
  options: { label: string; value: string | number }[];
  onChange: ((value: number) => void) | ((value: string) => void);
}

export default function Listbox({
  label,
  value,
  options,
  onChange,
}: ListboxProps) {
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
        "lg:text-2xl"
      )}
    >
      <HeadlessuiListbox value={value} onChange={onChange}>
        <HeadlessuiListbox.Label>{label}</HeadlessuiListbox.Label>
        <div className={classNames("ml-auto", "relative", "flex", "flex-col")}>
          <HeadlessuiListbox.Button
            className={classNames(
              "flex",
              "items-center",
              "w-40",
              "theme-dark:bg-neutral-700",
              "theme-light:bg-neutral-300",
              "theme-dark:hover:bg-neutral-600",
              "theme-light:hover:bg-neutral-400",
              "p-2",
              "bold-font:font-bold",
              "rounded-md"
            )}
          >
            {options.find((option) => option.value === value)?.label}
            <ExpandMore
              className={classNames(
                "ml-auto",
                "w-6",
                "h-6",
                "theme-dark:fill-white/50",
                "theme-light:fill-black/50"
              )}
            />
          </HeadlessuiListbox.Button>
          <div>
            <HeadlessuiListbox.Options
              className={classNames("absolute", "w-40", "z-20", "mt-2")}
            >
              {options.map((options, index) => (
                <HeadlessuiListbox.Option
                  key={index}
                  value={options.value}
                  className={classNames(
                    "flex",
                    "p-2",
                    "first:border-t-0",
                    "border-t",
                    "theme-dark:border-white/5",
                    "theme-light:border-black/10",
                    "theme-dark:bg-neutral-700",
                    "theme-light:bg-neutral-300",
                    "theme-dark:hover:bg-neutral-600",
                    "theme-light:hover:bg-neutral-400",
                    "bold-font:font-bold",
                    "first:rounded-t-md",
                    "last:rounded-b-md"
                  )}
                >
                  {options.label}{" "}
                  {options.value === value && (
                    <DoneIcon
                      className={classNames(
                        "w-6",
                        "h-6",
                        "ml-auto",
                        "theme-light:fill-black/50",
                        "theme-dark:fill-white/50"
                      )}
                    />
                  )}
                </HeadlessuiListbox.Option>
              ))}
            </HeadlessuiListbox.Options>
          </div>
        </div>
      </HeadlessuiListbox>
    </li>
  );
}
