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
          "outline-none",
          "flex",
          "items-center",
          "-mr-2",
          "px-2",
          "ui-focus-visible:outline-none",
          "ui-focus-visible:outline-offset-2",
          "ui-focus-visible:theme-light:outline-black",
          "ui-focus-visible:theme-dark:outline-white",
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
          "z-0",
          "mt-[30%]",
          "outline-none",
          "[&:hover>div>div]:outline-none",
          "border",
          "theme-light:bg-neutral-300",
          "theme-light:border-neutral-700",
          "theme-dark:bg-neutral-800",
          "theme-dark:border-neutral-300",
        )}
      >
        {items.map((link) => (
          <Menu.Item
            as="div"
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
              <a key={link.to} href={link.to}>
                {link.label}
              </a>
            </div>
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
