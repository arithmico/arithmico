import { pdf } from "@react-pdf/renderer";
import classNames from "classnames";
import { GraphicNode } from "engine/lib/types/graphics.types";
import FileSaver from "file-saver";
import PdfGraphic from "../pdf-graphic/pdf-graphic";
import { Menu } from "@headlessui/react";
import { DownloadIcon } from "ui-components";
import { useTranslation } from "react-i18next";

interface GraphicToolbarExportMenuProps {
  graphic: GraphicNode;
  input: string;
  isLandscape: boolean;
}

export function GraphicToolbarExportMenu({
  graphic,
  input,
  isLandscape,
}: GraphicToolbarExportMenuProps) {
  const [t] = useTranslation();
  const exportPdf = (braille: boolean) => {
    pdf(
      <PdfGraphic
        graphic={graphic}
        input={input}
        braille={braille}
        isLandscape={isLandscape}
      />
    )
      .toBlob()
      .then((blob) => FileSaver.saveAs(blob, "export.pdf"));
  };

  return (
    <Menu>
      {({ open }) => (
        <div className="relative">
          <Menu.Button
            className={classNames(
              "p-1",
              "rounded-sm",
              "border",
              "border-transparent",
              "theme-light:hover:bg-neutral-200",
              "theme-dark:hover:bg-neutral-700",
              "theme-dark:hover:border-neutral-500",
              "theme-light:hover:border-neutral-300",
              {
                "theme-light:bg-neutral-200": open,
                "theme-dark:bg-neutral-700": open,
                "theme-dark:border-neutral-500": open,
                "theme-light:border-neutral-300": open,
              }
            )}
          >
            <DownloadIcon
              className={classNames(
                "theme-light:fill-black",
                "theme-dark:fill-white",
                "w-8",
                "h-8"
              )}
            />
            <span className="sr-only">{t("sr.graphic.toolbar.download")}</span>
          </Menu.Button>
          <Menu.Items
            className={classNames(
              "absolute",
              "right-0",
              "w-32",
              "flex",
              "flex-col",
              "mt-1",
              "rounded-sm",
              "border",
              "theme-light:bg-neutral-200",
              "theme-dark:bg-neutral-700",
              "theme-dark:border-neutral-500",
              "theme-light:border-neutral-300"
            )}
          >
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => exportPdf(false)}
                  className={classNames(
                    "bold-font:font-bold",
                    "p-2",
                    "w-full",
                    "rounded-sm",
                    "text-left",
                    "border-b",
                    "rounded-t-sm",
                    "theme-light:text-black",
                    "theme-dark:text-white",
                    "theme-light:hover:bg-neutral-300",
                    "theme-dark:hover:bg-neutral-600",
                    "theme-light:border-b-black/5",
                    "theme-dark:border-b-white/10"
                  )}
                >
                  <span aria-hidden>{t("graphic.toolbar.download.pdf")}</span>
                  <span className="sr-only">
                    {t("sr.graphic.toolbar.download.pdf")}
                  </span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => exportPdf(true)}
                  className={classNames(
                    "bold-font:font-bold",
                    "p-2",
                    "w-full",
                    "rounded-sm",
                    "text-left",
                    "rounded-t-sm",
                    "theme-light:text-black",
                    "theme-dark:text-white",
                    "theme-light:hover:bg-neutral-300",
                    "theme-dark:hover:bg-neutral-600"
                  )}
                >
                  <span aria-hidden>
                    {t("graphic.toolbar.download.braille-pdf")}
                  </span>
                  <span className="sr-only">
                    {t("sr.graphic.toolbar.download.braille-pdf")}
                  </span>
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </div>
      )}
    </Menu>
  );
}
