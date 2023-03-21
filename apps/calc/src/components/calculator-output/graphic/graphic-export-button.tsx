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
  const onClickExportPDF = () => {
    pdf(<PdfGraphic graphic={graphic} input={input} braille={true} />)
      .toBlob()
      .then((blob) => FileSaver.saveAs(blob, "export.pdf"));
  };

  return (
    <button
      onClick={onClickExportPDF}
      className={classNames(
        "bold-font:font-bold",
        "border",
        "p-2",
        "w-full",
        "rounded-sm",
        "text-center",
        "theme-light:bg-neutral-200",
        "theme-light:hover:bg-neutral-300",
        "theme-light:border-black/10",
        "theme-dark:bg-neutral-800",
        "theme-dark:hover:bg-neutral-700",
        "theme-dark:border-white/5"
      )}
    >
      Export as pdf
    </button>
  );
}
