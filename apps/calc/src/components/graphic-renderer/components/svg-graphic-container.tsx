import { Svg } from "@react-pdf/renderer";
import { GraphicDimensions, RenderTarget } from "../graphic-renderer.types";

const minPadding = 0.025;

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
  const minDimension = Math.min(dimensions.width, dimensions.height);
  const [xPadding, yPadding] = [
    (dimensions.width / minDimension) * minPadding,
    (dimensions.height / minDimension) * minPadding,
  ];

  const viewBox = `${-0.5 - xPadding} ${
    -dimensions.height / dimensions.width / 2 - yPadding
  } ${1 + 2 * xPadding} ${dimensions.height / dimensions.width + 2 * yPadding}`;

  console.log(dimensions, absoluteDimensions);

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
