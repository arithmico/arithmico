import classNames from "classnames";
import { useTranslation } from "react-i18next";
import ProtocolListItemOutput from "./protocol-list-item-output";
import { ProtocolItem } from "../../store/slices/session.slice";

interface ProtocolItemProps {
  item: ProtocolItem;
}

export default function ProtocolListItem({ item }: ProtocolItemProps) {
  const [t] = useTranslation();
  return (
    <li
      className={classNames(
        "p-4",
        "max-w-full",
        "border-b",
        "theme-light:border-black/10",
        "theme-dark:border-white/5",
        {
          "theme-light:bg-red-100": item.output.type === "error",
          "theme-dark:bg-red-900": item.output.type === "error",
        }
      )}
    >
      <dl
        className={classNames(
          "grid",
          "grid-cols-[auto_1fr]",
          "gap-4",
          "max-w-full"
        )}
      >
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
        <dt
          className={classNames("max-w-full", "overflow-x-hidden", {
            "h-96": item.output.type === "graphic",
          })}
        >
          <ProtocolListItemOutput output={item.output} />
        </dt>
      </dl>
    </li>
  );
}
