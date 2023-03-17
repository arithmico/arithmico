import { Svg } from "@react-pdf/renderer";
import { GraphicDimensions, RenderTarget } from "../graphic-renderer.types";

export interface SvgGraphicContainerProps {
  target: RenderTarget;
  dimensions: GraphicDimensions;
  absoluteDimensions: GraphicDimensions;
  children: React.ReactNode;
}

export default function SvgGraphicContainer({
  target,
  dimensions,
  absoluteDimensions,
  children,
}: SvgGraphicContainerProps) {
  const viewBox = `${-0.5} ${-dimensions.height / dimensions.width / 2} ${1} ${
    dimensions.height / dimensions.width
  }`;

  switch (target) {
    case "web":
      return (
        <svg
          width={absoluteDimensions.width}
          height={absoluteDimensions.height}
          viewBox={viewBox}
        >
          {children}
        </svg>
      );

    case "pdf":
      return (
        <Svg viewBox={viewBox} style={{ border: "2px solid black" }}>
          {children}
        </Svg>
      );

    default:
      // eslint-disable-next-line no-throw-literal
      throw `unknown render target "${target}"`;
  }
}
