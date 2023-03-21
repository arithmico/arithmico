import { View, Text } from "@react-pdf/renderer";
import { convertToBraille } from "../../../utils/convert-to-braille";
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
  braille: boolean;
}

export default function PdfExportTitle({
  title,
  braille,
}: PdfExportTitleProps) {
  if (braille) {
    const brailleStr = convertToBraille(title);

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
        <Text
          style={{
            fontFamily: "Apple Braille",
            fontSize: "36pt",
            paddingLeft: "2px",
            paddingRight: "2px",
          }}
        >
          {brailleStr}
        </Text>
      </View>
    );
  }

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
