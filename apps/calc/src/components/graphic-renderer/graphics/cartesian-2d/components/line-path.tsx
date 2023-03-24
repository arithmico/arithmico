import { RenderTarget } from "@local-components/graphic-renderer/graphic-renderer.types";
import { Circle, G, Path } from "@react-pdf/renderer";
import classNames from "classnames";
import { LinePathPositions } from "../utils/calculate-line-paths";

const DASH_ARRAY = "0.02,0.01";
const LINE_WIDTH = 0.0075;

export type LinePathProps = LinePathPositions & {
  target: RenderTarget;
};

export default function LinePath({ points, style, target }: LinePathProps) {
  const pathString = points
    .map(({ x, y }, index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");

  const startPoint = points.at(0);
  const endPoint = points.at(-1);

  switch (target) {
    case "web":
      return (
        <g clipPath="url(#graphic-content-mask)">
          <path
            style={{
              strokeWidth: 3 * LINE_WIDTH,
            }}
            d={pathString}
            className={classNames(
              "fill-none",
              "theme-light:stroke-neutral-100",
              "theme-dark:stroke-neutral-800"
            )}
            strokeLinecap="round"
          />
          <path
            style={{
              strokeWidth: LINE_WIDTH,
            }}
            d={pathString}
            className={classNames(
              "fill-none",
              "theme-light:stroke-black",
              "theme-dark:stroke-white"
            )}
            strokeDasharray={style === "dashed" ? DASH_ARRAY : ""}
          />
        </g>
      );

    case "pdf":
      return (
        //@ts-ignore
        <G clipPath="url(#graphic-content-mask)">
          <Path
            d={pathString}
            style={{
              strokeWidth: 3 * LINE_WIDTH,
              stroke: "white",
              fill: "none",
            }}
          />
          <Circle
            style={{
              fill: "white",
            }}
            cx={startPoint!.x}
            cy={startPoint!.y}
            r={0.015 / 2}
          />
          <Circle
            style={{
              fill: "white",
            }}
            cx={endPoint!.x}
            cy={endPoint!.y}
            r={0.015 / 2}
          />
          <Path
            d={pathString}
            style={{ strokeWidth: LINE_WIDTH, stroke: "black", fill: "none" }}
            strokeDasharray={style === "dashed" ? DASH_ARRAY : ""}
          />
        </G>
      );
  }
}
