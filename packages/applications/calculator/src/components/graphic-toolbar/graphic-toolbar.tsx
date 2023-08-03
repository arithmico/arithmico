import { GraphicNode } from "engine/lib/types/graphics.types";
import { useTranslation } from "react-i18next";
import { AspectRatioIcon, CloseIcon } from "ui-components";
import { GraphicToolbarExportMenu } from "./graphic-toolbar-export-menu";

interface GraphicOutputToolbarProps {
  graphic: GraphicNode;
  input: string;
  onClose: () => void;
  toggleAspectRatio: () => void;
}

export function GraphicToolbar({
  graphic,
  input,
  onClose,
  toggleAspectRatio,
}: GraphicOutputToolbarProps) {
  const [t] = useTranslation();

  return (
    <div className="ml-auto grid gap-2 grid-cols-3  ">
      <GraphicToolbarExportMenu graphic={graphic} input={input} />
      <button
        onClick={toggleAspectRatio}
        className="rounded-sm border border-transparent theme-light:hover:border-neutral-300 theme-dark:hover:border-neutral-500 theme-dark:hover:bg-neutral-700 p-1 theme-light:hover:bg-neutral-200"
      >
        <AspectRatioIcon className="theme-light:fill-black theme-dark:fill-white w-8 h-8" />
        <span className="sr-only">
          {t("graphic.dialog.toggle-aspect-ratio")}
        </span>
      </button>
      <button
        className="rounded-sm border border-transparent theme-light:hover:border-neutral-300 theme-dark:hover:border-neutral-500 theme-dark:hover:bg-neutral-700 p-1 theme-light:hover:bg-neutral-200"
        onClick={onClose}
      >
        <CloseIcon className="theme-light:fill-black theme-dark:fill-white w-8 h-8" />
        <span className="sr-only">{t("graphic.dialog.close")}</span>
      </button>
    </div>
  );
}
