import { View, Text, Image, Link } from "@react-pdf/renderer";

export default function PdfExportWatermark() {
  return (
    <View
      style={{
        position: "absolute",
        bottom: "0.75cm",
        right: "0.75cm",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: "75px",
      }}
    >
      <View
        style={{
          paddingRight: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity: 0.45,
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
      <View
        style={{
          width: "40px",
          height: "40px",
          border: "1.5px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            opacity: 0.45,
            width: "34px",
            height: "34px",
          }}
          src="./arithmico-qr-code.png"
        />
      </View>
    </View>
  );
}
