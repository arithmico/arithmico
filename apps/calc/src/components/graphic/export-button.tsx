import { Document, Page, pdf, Text, View } from "@react-pdf/renderer";
import classNames from "classnames";
import GraphicRenderer from "@local-components/graphic/graphic-renderer";
import { ViewBoxDimension } from "@local-components/graphic/graphic-utils";
import { GraphicNode } from "@arithmico/engine/lib/types/graphics.types";
import FileSaver from "file-saver";

interface ExportButtonProps {
  graphic: GraphicNode;
}

export default function ExportButton({ graphic }: ExportButtonProps) {
  const viewBoxDimension: ViewBoxDimension = {
    viewBoxWidth: 30,
    viewBoxHeight: 30,
  };

  const GraphicDOM = (
    <Document>
      <Page size="A4">
        <View>
          <GraphicRenderer
            graphic={graphic}
            viewBoxDimension={viewBoxDimension}
            target={"pdf"}
          />
        </View>
        <View>
          <Text>Hello World!</Text>
        </View>
      </Page>
    </Document>
  );

  const onClickExportPDF = () => {
    pdf(GraphicDOM)
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
