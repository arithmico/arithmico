import React from "react";
import { Disclosure } from "@headlessui/react";
import ExpandMore from "@components/icons/expand-more";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

interface ManualSectionProps {
  name: string;
  children: React.ReactNode;
}

export default function ManualSection({ name, children }: ManualSectionProps) {
  const [t] = useTranslation();

  return (
    <section
      className={classNames(
        "flex",
        "flex-col",
        "mb-6",
        "rounded-md",
        "theme-dark:bg-neutral-850",
        "theme-light:bg-neutral-100",
        "bold-font:font-bold"
      )}
    >
      <h2 className="sr-only">{name}</h2>
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={classNames(
                "flex",
                "theme-dark:bg-neutral-800",
                "theme-light:bg-neutral-200",
                "border",
                "theme-dark:border-white/5",
                "theme-light:border-black/10",
                "px-4",
                "py-2",
                "items-center",
                "rounded-t-md",
                {
                  "rounded-b-md": !open,
                  "border-b-0": open,
                }
              )}
            >
              <span aria-hidden className={classNames("text-3xl")}>
                {name}
              </span>
              <span className="sr-only">
                {t(open ? "common.collapse" : "common.expand")}
              </span>
              <ExpandMore
                className={classNames(
                  "theme-dark:fill-white/50",
                  "theme-light:fill-black/50",
                  "ml-auto",
                  {
                    "rotate-180": open,
                  }
                )}
              />
            </Disclosure.Button>
            <Disclosure.Panel className={classNames("")}>
              <dl
                className={classNames(
                  "grid",
                  "grid-cols-[1fr_2fr]",
                  "border-x",
                  "border-b",
                  "theme-dark:border-white/5",
                  "theme-light:border-black/10"
                )}
              >
                {children}
              </dl>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </section>
  );
}
