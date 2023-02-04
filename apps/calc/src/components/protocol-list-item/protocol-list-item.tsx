import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { ProtocolItem } from "../../../../../libs/stores/slices/calculator-session";
import ProtocolListItemOutput from "./protocol-list-item-output";

interface ProtocolItemProps {
  item: ProtocolItem;
}

export default function ProtocolListItem({ item }: ProtocolItemProps) {
  const [t] = useTranslation();
  return (
    <li
      className={classNames(
        "p-4",
        "border-b",
        "theme-light:border-black/10",
        "theme-dark:border-white/5",
        {
          "theme-light:bg-red-100": item.output.type === "error",
          "theme-dark:bg-red-900": item.output.type === "error",
        }
      )}
    >
      <dl className={classNames("grid", "grid-cols-[auto_1fr]", "gap-4")}>
        <dd
          className={classNames(
            "theme-light:text-black/40",
            "theme-dark:text-white/40"
          )}
        >
          {t("common.input")}:
        </dd>
        <dt>{item.input}</dt>
        <dd
          className={classNames(
            "theme-light:text-black/40",
            "theme-dark:text-white/40"
          )}
        >
          {t("common.output")}:
        </dd>
        <dt>
          <ProtocolListItemOutput output={item.output} />
        </dt>
      </dl>
    </li>
  );
}
