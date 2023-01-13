import React from "react";
import Switch from "../switch/switch";
import { Disclosure } from "@headlessui/react";
import ExpandMore from "@components/icons/expand-more";
import { useDispatch, useSelector } from "react-redux";
import { ConfigRootState } from "@stores/config-store";
import { toggleObject } from "@stores/slices/config-profile";
import classNames from "classnames";

interface PluginItemProps {
  name: string;
  synopsis: string;
  description: string;
}
interface PluginConfigProps {
  name: string;
  items: PluginItemProps[];
}

export default function PluginConfig({ name, items }: PluginConfigProps) {
  const enabledObjects = useSelector(
    (state: ConfigRootState) => state.profile.objects
  );
  const dispatch = useDispatch();

  return (
    <section className={classNames("flex", "flex-col", "mt-8", "mb-4")}>
      <Disclosure>
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
              <h1
                className={classNames(
                  "text-2xl",
                  "m-0",
                  "bold-font:font-bold",
                  "theme-light:text-black",
                  "theme-dark:text-white"
                )}
              >
                {name}
              </h1>
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
            <Disclosure.Panel>
              <ul className={classNames("p-0", "m-0", "list-none")}>
                {items.map((item, index) => (
                  <Switch
                    key={index}
                    label={item.synopsis}
                    enabled={enabledObjects.includes(item.name)}
                    onChange={() => dispatch(toggleObject(item.name) || false)}
                  ></Switch>
                ))}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </section>
  );
}
