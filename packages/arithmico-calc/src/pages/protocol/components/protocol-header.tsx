import { ArrowBackIcon } from "@arithmico/frontend-components";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useExportProtocol from "../../../hooks/use-export-protocol";
import { resetProtocol } from "../../../store/slices/session.slice";

export function ProtocolHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const downloadProtocol = useExportProtocol();
  const [t] = useTranslation();

  return (
    <div
      className={classNames(
        "grid",
        "grid-cols-[auto_1fr_auto]",
        "theme-dark:bg-neutral-800",
        "theme-light:bg-neutral-200",
        "rounded-md",
        "items-center",
        "ring-1",
        "theme-dark:ring-white/5",
        "theme-light:ring-black/10"
      )}
    >
      <h1
        className={classNames("text-3xl", "px-4", "col-start-2", "row-start-1")}
      >
        {t("history.title")}
      </h1>
      <div className={classNames("flex", "h-full")}>
        <button
          onClick={() => downloadProtocol()}
          className={classNames(
            "px-4",
            "opacity-60",
            "hover:opacity-100",
            "rounded-md",
            "theme-dark:hover:bg-neutral-700",
            "theme-light:hover:bg-neutral-300"
          )}
        >
          <span aria-hidden>{t("history.download")}</span>
          <span className="sr-only">{t("sr.history.download")}</span>
        </button>
        <button
          onClick={() => dispatch(resetProtocol())}
          className={classNames(
            "px-4",
            "opacity-60",
            "hover:opacity-100",
            "rounded-md",
            "theme-dark:hover:bg-neutral-700",
            "theme-light:hover:bg-neutral-300"
          )}
        >
          <span aria-hidden>{t("history.reset")}</span>
          <span className="sr-only">{t("sr.history.reset")}</span>
        </button>
      </div>
      <button
        className={classNames(
          "ml-auto",
          "p-3  ",
          "theme-dark:hover:bg-neutral-700",
          "theme-light:hover:bg-neutral-300",
          "rounded-md",
          "col-start-1",
          "row-start-1",
          "opacity-60",
          "hover:opacity-100"
        )}
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon
          className={classNames(
            "theme-dark:fill-white",
            "theme-light:fill-black",
            "w-8",
            "h-8"
          )}
        />
        <span className="sr-only">{t("common.back")}</span>
      </button>
    </div>
  );
}
