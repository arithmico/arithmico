import { Circle, G } from "@react-pdf/renderer";
import classNames from "classnames";
import { RenderTarget } from "../../../graphic-renderer.types";

export interface CoordinateGridProps {
  target: RenderTarget;
  points: { x: number; y: number }[];
}

export default function CoordinateGrid({
  target,
  points,
}: CoordinateGridProps) {
  switch (target) {
    case "web":
      return (
        <g>
          {points.map(({ x, y }) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r={0.0035}
              className={classNames(
                "theme-light:fill-black",
                "theme-dark:fill-white"
              )}
            />
          ))}
        </g>
      );

    case "pdf":
      return (
        <G>
          {points.map(({ x, y }) => (
            <Circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r={0.0025}
              style={{ fill: "black" }}
            />
          ))}
        </G>
      );
  }
}
