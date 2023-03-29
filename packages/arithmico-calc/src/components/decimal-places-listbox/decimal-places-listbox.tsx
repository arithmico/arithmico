import { Listbox as HeadlessuiListbox } from "@headlessui/react";
import classNames from "classnames";
import { ExpandMore } from "@arithmico/frontend-components";
import { useTranslation } from "react-i18next";

interface DecimalPlacesListboxProps {
  value: string | number;
  onChange: ((value: number) => void) | ((value: string) => void);
}

export default function DecimalPlacesListbox({
  value,
  onChange,
}: DecimalPlacesListboxProps) {
  const [t] = useTranslation();

  return (
    <li
      className={classNames(
        "flex",
        "items-center",
        "text-2xl",
        "h-16",
        "bold-font:font-bold"
      )}
    >
      <HeadlessuiListbox value={value} onChange={onChange}>
        <HeadlessuiListbox.Label>
          {t("settings.significantDecimalPlaces")}
        </HeadlessuiListbox.Label>
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
              "rounded-md"
            )}
          >
            {value}
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
              className={classNames(
                "absolute",
                "w-40",
                "z-20",
                "mt-2",
                "grid",
                "grid-cols-5",
                "[&>*:nth-child(1)]:rounded-tl-md",
                "[&>*:nth-child(5)]:rounded-tr-md",
                "[&>*:nth-child(11)]:rounded-bl-md",
                "[&>*:nth-child(15)]:rounded-br-md",
                "[&>*:nth-child(11)]:rounded-bl-md",
                "[&>*:nth-child(5n)]:border-l-0"
              )}
            >
              {new Array(15).fill(0).map((_, index) => (
                <HeadlessuiListbox.Option
                  key={index}
                  value={index}
                  className={classNames(
                    "flex",
                    "items-center",
                    "justify-center",
                    "p-2",
                    "first:border-t-0",
                    "border-t",
                    "border-l",
                    "theme-dark:border-white/5",
                    "theme-light:border-black/10",
                    "theme-dark:bg-neutral-700",
                    "theme-light:bg-neutral-300",
                    "theme-dark:hover:bg-neutral-600",
                    "theme-light:hover:bg-neutral-400",
                    {
                      "theme-dark:bg-neutral-600": index === value,
                      "theme-light:bg-neutral-400": index === value,
                    }
                  )}
                >
                  {index}
                </HeadlessuiListbox.Option>
              ))}
            </HeadlessuiListbox.Options>
          </div>
        </div>
      </HeadlessuiListbox>
    </li>
  );
}
