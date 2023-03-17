import { Limits, Point2D } from "@arithmico/engine/lib/types/graphics.types";
import {
  GraphicDimensions,
  RenderTarget,
} from "@local-components/graphic-renderer/graphic-renderer.types";
import { Path } from "@react-pdf/renderer";
import classNames from "classnames";
import { transformToSvgViewport } from "@local-components/graphic-renderer/graphic-utils";

interface PlotLineProps {
  points: Point2D[];
  limits: Limits;
  dimension: GraphicDimensions;
  target: RenderTarget;
}

export default function PlotLine({
  points,
  limits,
  dimension,
  target,
}: PlotLineProps) {
  const pathString = points
    .map(({ x, y }, index) => {
      const { x: viewX, y: viewY } = transformToSvgViewport(
        { x, y },
        dimension,
        limits
      );
      return `${index === 0 ? "M" : "L"} ${viewX} ${viewY}`;
    })
    .join(" ");

  switch (target) {
    case "web":
      return (
        <path
          d={pathString}
          className={classNames(
            "stroke-[0.005]",
            "fill-none",
            "theme-light:stroke-black",
            "theme-dark:stroke-white"
          )}
        />
      );

    case "pdf":
      return (
        <Path
          d={pathString}
          style={{ strokeWidth: 0.005, stroke: "black", fill: "none" }}
        />
      );

    default:
      // eslint-disable-next-line no-throw-literal
      throw `unknown render target "${target}"`;
  }
}
