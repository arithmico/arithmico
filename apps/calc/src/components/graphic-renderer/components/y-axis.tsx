import { G, Line, Polygon } from "@react-pdf/renderer";
import classNames from "classnames";
import { RenderTarget } from "../graphic-renderer.types";
import { TICK_LINE_LENGTH } from "../graphic-utils";
import { SingleAxisPositions } from "../graphics/cartesian-2d/utils/calculate-axis-positions";
import { GRAPHIC_MIN_PADDING } from "./svg-graphic-container";

export type YAxisProps = SingleAxisPositions & { target: RenderTarget };

export default function YAxis({
  startPosition,
  endPosition,
  tickPositions,
  target,
}: YAxisProps) {
  const trianglePoints = `${endPosition.x - GRAPHIC_MIN_PADDING / 4},${
    endPosition.y
  } ${endPosition.x + GRAPHIC_MIN_PADDING / 4},${endPosition.y} ${
    endPosition.x
  },${endPosition.y - GRAPHIC_MIN_PADDING}`;

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
              key={y}
              y1={y}
              y2={y}
              x1={x + TICK_LINE_LENGTH / 2}
              x2={x - TICK_LINE_LENGTH / 2}
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
              key={y}
              y1={y}
              y2={y}
              x1={x + TICK_LINE_LENGTH / 2}
              x2={x - TICK_LINE_LENGTH / 2}
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
