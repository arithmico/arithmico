import { G, Line, Polygon } from "@react-pdf/renderer";
import classNames from "classnames";
import { GRAPHIC_MIN_PADDING } from "../../../components/svg-graphic-container";
import { RenderTarget } from "../../../graphic-renderer.types";
import { TICK_LINE_LENGTH } from "../../../graphic-utils";
import { SingleAxisPositions } from "../utils/calculate-axis-positions";

export type XAxisProps = SingleAxisPositions & { target: RenderTarget };

export default function XAxis({
  startPosition,
  endPosition,
  tickPositions,
  target,
}: XAxisProps) {
  const arrowLength = (GRAPHIC_MIN_PADDING * 2) / 3;
  const arrowHeight = arrowLength / 2;
  const trianglePoints = `${endPosition.x},${endPosition.y - arrowHeight / 2} ${
    endPosition.x
  },${endPosition.y + arrowHeight / 2} ${endPosition.x + arrowLength},${
    endPosition.y
  }`;

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
