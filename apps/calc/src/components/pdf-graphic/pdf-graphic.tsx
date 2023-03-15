import { GraphicNode } from "@arithmico/engine/lib/types";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { GraphicDimensions } from "../graphic-renderer/graphic-renderer.types";
import GraphicFixedSizeHandler from "../graphic-renderer/size-handlers/graphic-fixed-size-handler";

export interface PdfGraphicProps {
  graphic: GraphicNode;
}

export default function PdfGraphic({ graphic }: PdfGraphicProps) {
  const graphicDimensions: GraphicDimensions = {
    width: 1000,
    height: 1200,
  };

  return (
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
            dimensions={graphicDimensions}
            target={"pdf"}
          />
        </View>
      </Page>
    </Document>
  );
}
