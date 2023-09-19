import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Menu } from "@headlessui/react";
import { resetAll } from "../../store/slices/session.slice";
import classNames from "classnames";

export default function MobileToolbar() {
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const classNameMenuItems = classNames(
    "flex",
    "w-full",
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
    "last:rounded-b-md",
    "focus:outline-none",
    "ui-active:outline",
    "outline-2",
    "outline-offset-2",
    "theme-light:outline-black",
    "theme-dark:outline-white",
  );

  return (
    <div className={classNames("md:hidden", "w-full")}>
      <Menu>
        <Menu.Button
          className={classNames(
            "flex",
            "items-center",
            "w-full",
            "mb-2",
            "theme-dark:bg-neutral-700",
            "theme-light:bg-neutral-300",
            "theme-dark:hover:bg-neutral-600",
            "theme-light:hover:bg-neutral-400",
            "p-2",
            "bold-font:font-bold",
            "rounded-md",
            "ui-focus-visible:outline",
            "outline-2",
            "outline-offset-2",
            "theme-light:outline-black",
            "theme-dark:outline-white",
          )}
        >
          {t("toolbar.functions")}
        </Menu.Button>
        <Menu.Items
          className={classNames(
            "ml-auto",
            "ml-2",
            "rounded-md",
            "theme-dark:bg-neutral-700",
            "theme-light:bg-neutral-300",
            "outline-none",
            "[&:hover>a]:outline-none",
            "[&:hover>button]:outline-none",
          )}
        >
          <Menu.Item>
            <a className={classNames(classNameMenuItems)} href="/definitions">
              {t("toolbar.definitions")}
            </a>
          </Menu.Item>
          <Menu.Item>
            <a className={classNames(classNameMenuItems)} href="/history">
              {t("toolbar.history")}
            </a>
          </Menu.Item>
          <Menu.Item>
            <button
              className={classNames(classNameMenuItems)}
              onClick={() => dispatch(resetAll())}
            >
              {t("toolbar.resetAll")}
            </button>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}
