import React from "react";
import Switch from "../switch/switch";
import { Disclosure } from "@headlessui/react";
import ExpandMore from "@components/icons/expand-more";
import { useDispatch, useSelector } from "react-redux";
import { ConfigRootState } from "@stores/config-store";
import classNames from "classnames";
import {
  toggleConstant,
  toggleFunction,
  toggleMethod,
} from "@stores/slices/engine-features";
import { PluginStructureItem } from "@arithmico/engine/lib/types/plugin.types";

function convertToCamelCase(name: string): string {
  const nameParts = name.split(":");

  if (nameParts.length === 1) {
    return nameParts[0];
  }

  if (nameParts.length >= 2) {
    const resultStrings: string[] = [];
    nameParts.forEach((value, index) =>
      resultStrings.push(
        index !== 0 ? value.charAt(0).toUpperCase() + value.slice(1) : value
      )
    );

    return resultStrings.join("");
  }

  // eslint-disable-next-line no-throw-literal
  return "error";
}

interface PluginConfigProps {
  name: string;
  items: PluginStructureItem[];
}

export default function PluginConfig({ name, items }: PluginConfigProps) {
  const enabledConstants = useSelector(
    (state: ConfigRootState) => state.engineFeatures.constants
  );
  const enabledFunctions = useSelector(
    (state: ConfigRootState) => state.engineFeatures.functions
  );
  const enabledMethods = useSelector(
    (state: ConfigRootState) => state.engineFeatures.methods
  );
  const dispatch = useDispatch();

  const toggle = (item: PluginStructureItem) => {
    const convertedName = convertToCamelCase(item.name);

    switch (item.type) {
      case "constant":
        return dispatch(toggleConstant(convertedName));
      case "function":
        return dispatch(toggleFunction(convertedName));
      case "method":
        return dispatch(toggleMethod(convertedName));
    }
  };

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
              <ul
                className={classNames(
                  "p-0",
                  "px-4",
                  "list-none",
                  "bg-neutral-100",
                  "rounded-b-md",
                  "border",
                  "theme-light:border-black/10"
                )}
              >
                {items.map((item, index) => (
                  <Switch
                    key={index}
                    label={item.synopsis.en}
                    enabled={
                      (item.type === "function" &&
                        enabledFunctions.includes(
                          convertToCamelCase(item.name)
                        )) ||
                      (item.type === "constant" &&
                        enabledConstants.includes(
                          convertToCamelCase(item.name)
                        )) ||
                      (item.type === "method" &&
                        enabledMethods.includes(convertToCamelCase(item.name)))
                    }
                    onChange={() => toggle(item) || false}
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
