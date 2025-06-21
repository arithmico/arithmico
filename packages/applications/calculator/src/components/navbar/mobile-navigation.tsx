import { MenuIcon } from "ui-components";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { NavigationProps } from "./types";

interface DisclosureContentProps {
  items: NavigationProps["items"];
  close: () => void;
}

function MenuContent({ items, close }: DisclosureContentProps) {
  const location = useLocation();
  const [t] = useTranslation();

  useEffect(() => {
    close();
  }, [close, location]);

  return (
    <>
      <Menu.Button
        className={classNames(
          "h-full",
          //"outline-none",
          "flex",
          "items-center",
          "-mr-2",
          "px-2",
        )}
      >
        <MenuIcon
          className={classNames(
            "theme-light:fill-black",
            "theme-dark:fill-white",
            "w-8",
            "h-8",
          )}
        />
        <span className="sr-only">{t("nav.menu")}</span>
      </Menu.Button>
      <Menu.Items
        as="nav"
        className={classNames(
          "absolute",
          "left-0",
          "right-0",
          "mt-[30%]",
          "outline-none",
          "border",
          "theme-light:bg-neutral-300",
          "theme-light:border-neutral-700",
          "theme-dark:bg-neutral-800",
          "theme-dark:border-neutral-300",
        )}
      >
        {items.map((link) => (
          <Menu.Item key={link.to}>
            <a
              key={link.to}
              href={link.to}
              className={classNames(
                "block",
                "p-2",
                "border-b",
                "theme-light:border-b-neutral-700",
                "theme-dark:border-b-neutral-300",
              )}
            >
              <div
                className={classNames(
                  "mx-1",
                  "pl-1",
                  "ui-active:outline",
                  "outline-offset-2",
                  "theme-light:outline-black",
                  "theme-dark:outline-white",
                )}
              >
                {link.label}
              </div>
            </a>
          </Menu.Item>
        ))}
      </Menu.Items>
    </>
  );
}

export function MobileNavigation({ items }: NavigationProps) {
  return (
    <div
      className={classNames(
        "ml-auto",
        "md:hidden",
        "h-full",
        "flex",
        "flex-col",
        "justify-center",
      )}
    >
      <Menu>
        {({ open, close }) => <MenuContent close={close} items={items} />}
      </Menu>
    </div>
  );
}
