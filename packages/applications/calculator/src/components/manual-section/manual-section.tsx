import React from "react";
import { Disclosure } from "@headlessui/react";
import { ExpandMore } from "ui-components";
import classNames from "classnames";

interface ManualSectionProps {
  name: string;
  children: React.ReactNode;
}

export default function ManualSection({ name, children }: ManualSectionProps) {
  return (
    <section
      className={classNames(
        "flex",
        "flex-col",
        "mb-6",
        "rounded-md",
        "theme-dark:bg-neutral-850",
        "theme-light:bg-neutral-100",
        "bold-font:font-bold",
      )}
    >
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
                "ui-focus-visible:outline",
                "outline-2",
                "outline-offset-2",
                "theme-light:outline-black",
                "theme-dark:outline-white",
                {
                  "rounded-b-md": !open,
                  "border-b-0": open,
                },
              )}
            >
              <span className={classNames("text-3xl")}>
                {name}
              </span>
              <ExpandMore
                className={classNames(
                  "theme-dark:fill-white/50",
                  "theme-light:fill-black/50",
                  "ml-auto",
                  {
                    "rotate-180": open,
                  },
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
                  "theme-light:border-black/10",
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
