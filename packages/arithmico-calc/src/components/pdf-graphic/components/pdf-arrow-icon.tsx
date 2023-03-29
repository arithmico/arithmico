import { Path, Svg } from "@react-pdf/renderer";

export default function PdfArrowIcon() {
  return (
    <Svg
      viewBox="0 0 48 48"
      style={{
        width: 25,
        height: 20,
        transform: "scaleX(1.25)",
      }}
    >
      <Path
        style={{
          fill: "black",
        }}
        d="m24 40-2.1-2.15L34.25 25.5H8v-3h26.25L21.9 10.15 24 8l16 16Z"
      />
    </Svg>
  );
}
