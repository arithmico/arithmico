import { ArrowBackIcon, DeleteIcon } from "ui-components";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetDefinitions } from "../../../store/slices/session.slice";

export function DefinitionsHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        {t("definitions.title")}
      </h1>
      <div className={classNames("flex", "h-full")}>
        <button
          onClick={() => dispatch(resetDefinitions())}
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
            "theme-light:hover:bg-neutral-300"
          )}
        >
          <DeleteIcon
            className={classNames(
              "w-6",
              "h-6",
              "theme-light:fill-black",
              "theme-dark:fill-white"
            )}
          />
          <span aria-hidden className={classNames("hidden", "sm:inline-block")}>
            {t("definitions.reset")}
          </span>
          <span className="sr-only">{t("sr.definitions.reset")}</span>
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
            "w-6",
            "h-6"
          )}
        />
        <span className="sr-only">{t("common.back")}</span>
      </button>
    </div>
  );
}
