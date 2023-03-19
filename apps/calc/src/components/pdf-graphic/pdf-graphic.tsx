import { GraphicNode } from "@arithmico/engine/lib/types";
import { Document, Page, View } from "@react-pdf/renderer";
import { GraphicDimensions } from "../graphic-renderer/graphic-renderer.types";
import GraphicFixedSizeHandler from "../graphic-renderer/size-handlers/graphic-fixed-size-handler";
import PdfExportTitle from "./components/pdf-export-title";
import PdfExportWatermark from "./components/pdf-export-watermark";

export interface PdfGraphicProps {
  graphic: GraphicNode;
  input: string;
}

export default function PdfGraphic({ graphic, input }: PdfGraphicProps) {
  const graphicDimensions: GraphicDimensions = {
    width: 1000,
    height: 1200,
  };

  return (
    <Document>
      <Page
        size="A4"
        style={{
          display: "flex",
          flexDirection: "column",
          paddingHorizontal: "2cm",
          paddingVertical: "1.69cm",
        }}
      >
        <PdfExportTitle title={input} />
        <View>
          <GraphicFixedSizeHandler
            graphic={graphic}
            dimensions={graphicDimensions}
            target={"pdf"}
          />
        </View>
        <PdfExportWatermark />
      </Page>
    </Document>
  );
}
