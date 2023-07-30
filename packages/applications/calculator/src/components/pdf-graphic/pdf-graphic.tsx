import { GraphicNode } from "arithmico-engine/lib/types";
import { Document, Page, View, Font } from "@react-pdf/renderer";
import { GraphicDimensions } from "../graphic-renderer/graphic-renderer.types";
import GraphicFixedSizeHandler from "../graphic-renderer/size-handlers/graphic-fixed-size-handler";
import PdfExportTitle from "./components/pdf-export-title";
import PdfExportWatermark from "./components/pdf-export-watermark";

Font.register({
  family: "Apple Braille",
  fonts: [
    {
      src: "./fonts/apple-braille-web.ttf",
      fontWeight: "normal",
    },
  ],
});

export interface PdfGraphicProps {
  graphic: GraphicNode;
  input: string;
  braille: boolean;
}

export default function PdfGraphic({
  graphic,
  input,
  braille,
}: PdfGraphicProps) {
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
        <PdfExportTitle title={input} braille={braille} />
        <View>
          <GraphicFixedSizeHandler
            graphic={graphic}
            dimensions={graphicDimensions}
            target={"pdf"}
            braille={braille}
          />
        </View>
        <PdfExportWatermark />
      </Page>
    </Document>
  );
}
