import { View, Text } from "@react-pdf/renderer";
import PdfArrowIcon from "./pdf-arrow-icon";

function splitBeforeAndAfterPattern(str: string, pattern: string) {
  return str
    .split(pattern)
    .flatMap((chunk, index) => (index === 0 ? [chunk] : [pattern, chunk]));
}

function splitBeforeAndAfterPatterns(str: string, patterns: string[]) {
  return patterns
    .reduce(
      (chunks, pattern) =>
        chunks.flatMap((chunk) => splitBeforeAndAfterPattern(chunk, pattern)),
      [str]
    )
    .map((chunk) => chunk.trim());
}

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
      {splitBeforeAndAfterPatterns(title, ["+", "-", "*", "/", "^", "→"]).map(
        (chunk, index) =>
          chunk === "→" ? (
            <PdfArrowIcon />
          ) : (
            <Text
              style={{
                fontSize: "26px",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              {chunk}
            </Text>
          )
      )}
    </View>
  );
}
