import { GraphicNode } from "engine/lib/types";
import { Document, Page, View, Font } from "@react-pdf/renderer";
import { GraphicDimensions } from "../graphic-renderer/graphic-renderer.types";
import GraphicFixedSizeHandler from "../graphic-renderer/size-handlers/graphic-fixed-size-handler";
import PdfExportTitle from "./components/pdf-export-title";
import PdfExportWatermark from "./components/pdf-export-watermark";

export const GRAPHIC_LANDSCAPE_WIDTH = 1600;
export const GRAPHIC_LANDSCAPE_HEIGHT = 850;
export const GRAPHIC_PORTRAIT_WIDTH = 1000;
export const GRAPHIC_PORTRAIT_HEIGHT = 1300;

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
  isLandscape: boolean;
}

export default function PdfGraphic({
  graphic,
  input,
  braille,
  isLandscape,
}: PdfGraphicProps) {
  console.log(isLandscape);
  const graphicDimensions: GraphicDimensions = isLandscape
    ? {
        width: GRAPHIC_LANDSCAPE_WIDTH,
        height: GRAPHIC_LANDSCAPE_HEIGHT,
      }
    : {
        width: GRAPHIC_PORTRAIT_WIDTH,
        height: GRAPHIC_PORTRAIT_HEIGHT,
      };

  return (
    <Document>
      <Page
        size="A4"
        orientation={isLandscape ? "landscape" : "portrait"}
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
