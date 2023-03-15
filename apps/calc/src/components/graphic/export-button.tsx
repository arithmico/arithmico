import { Document, Page, pdf, Text, View } from "@react-pdf/renderer";
import classNames from "classnames";
import { ViewBoxDimension } from "@local-components/graphic/graphic-utils";
import { GraphicNode } from "@arithmico/engine/lib/types/graphics.types";
import FileSaver from "file-saver";
import GraphicFixedSizeHandler from "../graphic-renderer/size-handlers/graphic-fixed-size-handler";

interface ExportButtonProps {
  graphic: GraphicNode;
}

export default function ExportButton({ graphic }: ExportButtonProps) {
  const viewBoxDimension: ViewBoxDimension = {
    viewBoxWidth: 1000,
    viewBoxHeight: 1200,
  };

  const GraphicDOM = (
    <Document>
      <Page
        size="A4"
        style={{ display: "flex", flexDirection: "column", padding: "2cm" }}
      >
        <View style={{ marginBottom: "1cm" }}>
          <Text style={{ fontSize: "30px" }}>Graphic export</Text>
        </View>
        <View>
          <GraphicFixedSizeHandler
            graphic={graphic}
            dimensions={{
              width: viewBoxDimension.viewBoxWidth,
              height: viewBoxDimension.viewBoxHeight,
            }}
            target={"pdf"}
          />
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
