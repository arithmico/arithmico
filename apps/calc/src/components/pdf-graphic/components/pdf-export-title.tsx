import { View, Text } from "@react-pdf/renderer";
import PdfArrowIcon from "./pdf-arrow-icon";

export interface PdfExportTitleProps {
  title: string;
}

export default function PdfExportTitle({ title }: PdfExportTitleProps) {
  return (
    <View
      style={{
        marginBottom: "1cm",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {title.split("→").map((chunk, index) => {
        return (
          <>
            {index !== 0 && <PdfArrowIcon />}
            <Text style={{ fontSize: "26px" }}>{chunk}</Text>
          </>
        );
      })}
    </View>
  );
}
