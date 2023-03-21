import { pdf } from "@react-pdf/renderer";
import classNames from "classnames";
import { GraphicNode } from "@arithmico/engine/lib/types/graphics.types";
import FileSaver from "file-saver";
import PdfGraphic from "../../pdf-graphic/pdf-graphic";

interface GraphicExportButtonProps {
  graphic: GraphicNode;
  input: string;
}

export default function GraphicExportButton({
  graphic,
  input,
}: GraphicExportButtonProps) {
  const exportPdf = (braille: boolean) => {
    pdf(<PdfGraphic graphic={graphic} input={input} braille={braille} />)
      .toBlob()
      .then((blob) => FileSaver.saveAs(blob, "export.pdf"));
  };

  return (
    <>
      <button
        onClick={() => exportPdf(false)}
        className={classNames(
          "bold-font:font-bold",
          "border",
          "p-2",
          "w-full",
          "rounded-sm",
          "text-left",
          "theme-light:bg-neutral-200",
          "theme-light:hover:bg-neutral-300",
          "theme-light:border-black/10",
          "theme-dark:bg-neutral-800",
          "theme-dark:hover:bg-neutral-700",
          "theme-dark:border-white/5"
        )}
      >
        Export PDF
      </button>
      <button
        onClick={() => exportPdf(true)}
        className={classNames(
          "bold-font:font-bold",
          "border",
          "p-2",
          "w-full",
          "rounded-sm",
          "text-left",
          "theme-light:bg-neutral-200",
          "theme-light:hover:bg-neutral-300",
          "theme-light:border-black/10",
          "theme-dark:bg-neutral-800",
          "theme-dark:hover:bg-neutral-700",
          "theme-dark:border-white/5"
        )}
      >
        Export PDF (braille)
      </button>
    </>
  );
}
