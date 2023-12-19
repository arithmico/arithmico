import { ArrowBackIcon, DeleteIcon, DownloadIcon } from "ui-components";
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
        "theme-light:ring-black/10",
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
            "flex",
            "items-center",
            "space-x-2",
            "px-2",
            "sm:px-4",
            "opacity-60",
            "hover:opacity-100",
            "rounded-md",
            "theme-dark:hover:bg-neutral-700",
            "theme-light:hover:bg-neutral-300",
            "ui-focus-visible:outline",
            "outline-2",
            "outline-offset-2",
            "theme-light:outline-black",
            "theme-dark:outline-white",
          )}
        >
          <DownloadIcon
            className={classNames(
              "justify-center",
              "w-6",
              "h-6",
              "theme-light:fill-black",
              "theme-dark:fill-white",
            )}
          />
          <span aria-hidden className={classNames("hidden", "sm:inline-block")}>
            {t("history.download")}
          </span>
          <span className="sr-only">{t("sr.history.download")}</span>
        </button>
        <button
          onClick={() => dispatch(resetProtocol())}
          className={classNames(
            "flex",
            "items-center",
            "space-x-2",
            "px-2",
            "sm:px-4",
            "opacity-60",
            "hover:opacity-100",
            "rounded-md",
            "theme-dark:hover:bg-neutral-700",
            "theme-light:hover:bg-neutral-300",
            "ui-focus-visible:outline",
            "outline-2",
            "outline-offset-2",
            "theme-light:outline-black",
            "theme-dark:outline-white",
          )}
        >
          <DeleteIcon
            className={classNames(
              "justify-center",
              "w-6",
              "h-6",
              "theme-light:fill-black",
              "theme-dark:fill-white",
            )}
          />
          <span aria-hidden className={classNames("hidden", "sm:inline-block")}>
            {t("history.reset")}
          </span>
          <span className="sr-only">{t("sr.history.reset")}</span>
        </button>
      </div>
      <button
        className={classNames(
          "ml-auto",
          "p-3",
          "theme-dark:hover:bg-neutral-700",
          "theme-light:hover:bg-neutral-300",
          "rounded-md",
          "col-start-1",
          "row-start-1",
          "opacity-60",
          "hover:opacity-100",
          "ui-focus-visible:outline",
          "outline-2",
          "outline-offset-2",
          "theme-light:outline-black",
          "theme-dark:outline-white",
        )}
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon
          className={classNames(
            "justify-center",
            "theme-dark:fill-white",
            "theme-light:fill-black",
            "w-6",
            "h-6",
          )}
        />
        <span className="sr-only">{t("common.back")}</span>
      </button>
    </div>
  );
}
