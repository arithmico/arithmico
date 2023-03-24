import { ClipPath, Defs, Rect, Svg } from "@react-pdf/renderer";
import { GraphicDimensions, RenderTarget } from "../graphic-renderer.types";

export const GRAPHIC_MIN_PADDING = 0.08;

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
    (dimensions.width / minDimension) * GRAPHIC_MIN_PADDING,
    (dimensions.height / minDimension) * GRAPHIC_MIN_PADDING,
  ];

  const viewBox = `${-0.5 - xPadding} ${
    -dimensions.height / dimensions.width / 2 - yPadding
  } ${1 + 2 * xPadding} ${dimensions.height / dimensions.width + 2 * yPadding}`;

  switch (target) {
    case "web":
      return (
        <svg
          width={absoluteDimensions.width}
          height={absoluteDimensions.height}
          viewBox={viewBox}
        >
          <defs>
            <clipPath id="graphic-content-mask">
              <rect
                x={-dimensions.width / 2}
                y={-dimensions.height / 2}
                width={dimensions.width}
                height={dimensions.height}
                style={{
                  fill: "white",
                  stroke: "none",
                }}
              />
            </clipPath>
          </defs>

          {children}
        </svg>
      );

    case "pdf":
      return (
        <Svg viewBox={viewBox}>
          <Defs>
            <ClipPath id="graphic-content-mask">
              <Rect
                x={-dimensions.width / 2}
                y={-dimensions.height / 2}
                width={dimensions.width}
                height={dimensions.height}
                style={{
                  fill: "white",
                  stroke: "none",
                }}
              />
            </ClipPath>
          </Defs>
          {children}
        </Svg>
      );
  }
}
