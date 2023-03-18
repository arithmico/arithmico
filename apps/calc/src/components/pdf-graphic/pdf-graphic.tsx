import { GraphicNode } from "@arithmico/engine/lib/types";
import { Document, Image, Link, Page, Text, View } from "@react-pdf/renderer";
import { GraphicDimensions } from "../graphic-renderer/graphic-renderer.types";
import GraphicFixedSizeHandler from "../graphic-renderer/size-handlers/graphic-fixed-size-handler";

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
        <View style={{ marginBottom: "1cm" }}>
          <Text style={{ fontSize: "26px" }}>{input}</Text>
        </View>
        <View>
          <GraphicFixedSizeHandler
            graphic={graphic}
            dimensions={graphicDimensions}
            target={"pdf"}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: "75px",
            opacity: 0.5,
          }}
        >
          <View
            style={{
              paddingRight: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: "10pt",
              }}
            >
              Created with Arithmico
            </Text>
            <Text
              style={{ fontSize: "10pt", color: "black", marginTop: "2px" }}
            >
              {"Visit "}
              <Link
                src="https://arithmico.com/"
                style={{
                  fontSize: "10pt",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                arithmico.com
              </Link>
            </Text>
          </View>
          <Image
            style={{ width: "30px", height: "30px" }}
            src="./arithmico-qr-code.png"
          />
        </View>
      </Page>
    </Document>
  );
}
