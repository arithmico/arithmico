import { G, Line, Polygon } from "@react-pdf/renderer";
import classNames from "classnames";
import { RenderTarget } from "../graphic-renderer.types";
import { TICK_LINE_LENGTH } from "../graphic-utils";
import { SingleAxisPositions } from "../graphics/cartesian-2d/utils/calculate-axis-positions";
import { GRAPHIC_MIN_PADDING } from "./svg-graphic-container";

export type XAxisProps = SingleAxisPositions & { target: RenderTarget };

export default function XAxis({
  startPosition,
  endPosition,
  tickPositions,
  target,
}: XAxisProps) {
  const trianglePoints = `${endPosition.x},${
    endPosition.y - GRAPHIC_MIN_PADDING / 4
  } ${endPosition.x},${endPosition.y + GRAPHIC_MIN_PADDING / 4} ${
    endPosition.x + GRAPHIC_MIN_PADDING
  },${endPosition.y}`;

  switch (target) {
    case "web":
      return (
        <g>
          <line
            x1={startPosition.x}
            y1={startPosition.y}
            x2={endPosition.x}
            y2={endPosition.y}
            className={classNames(
              "theme-light:stroke-black",
              "theme-dark:stroke-white",
              "stroke-[0.005]"
            )}
          />
          <polygon
            points={trianglePoints}
            className={classNames(
              "theme-light:fill-black",
              "theme-dark:fill-white"
            )}
          />
          {tickPositions.map(({ x, y }) => (
            <line
              key={x}
              x1={x}
              x2={x}
              y1={y + TICK_LINE_LENGTH / 2}
              y2={y - TICK_LINE_LENGTH / 2}
              className={classNames(
                "theme-light:stroke-black",
                "theme-dark:stroke-white",
                "stroke-[0.005]"
              )}
            />
          ))}
        </g>
      );

    case "pdf":
      return (
        <G>
          <Line
            x1={startPosition.x}
            y1={startPosition.y}
            x2={endPosition.x}
            y2={endPosition.y}
            style={{
              stroke: "black",
              strokeWidth: "0.005",
            }}
          />
          <Polygon
            points={trianglePoints}
            style={{
              fill: "black",
            }}
          />
          {tickPositions.map(({ x, y }) => (
            <Line
              key={x}
              x1={x}
              x2={x}
              y1={y + TICK_LINE_LENGTH / 2}
              y2={y - TICK_LINE_LENGTH / 2}
              style={{
                stroke: "black",
                strokeWidth: "0.005",
              }}
            />
          ))}
        </G>
      );
  }
}
