import { View, Text, Image, Link } from "@react-pdf/renderer";

export default function PdfExportWatermark() {
  return (
    <View
      style={{
        position: "absolute",
        bottom: "1cm",
        right: "1cm",
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
        <Text style={{ fontSize: "10pt", color: "black", marginTop: "2px" }}>
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
  );
}
