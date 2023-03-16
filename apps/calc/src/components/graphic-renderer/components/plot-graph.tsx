import { Limits, Point2D } from "@arithmico/engine/lib/types/graphics.types";
import {
  GraphicDimensions,
  RenderTarget,
} from "@local-components/graphic-renderer/graphic-renderer.types";
import { Path } from "@react-pdf/renderer";
import { transformToSvgViewport } from "@local-components/graphic-renderer/components/coordinate-grid";
import classNames from "classnames";

interface PlotGraphProps {
  points: Point2D[];
  limits: Limits;
  dimension: GraphicDimensions;
  target: RenderTarget;
}

export default function PlotGraph({
  points,
  limits,
  dimension,
  target,
}: PlotGraphProps) {
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
      return <path d={pathString} className={classNames("stroke-1")} />;

    case "pdf":
      return <Path d={pathString} />;

    default:
      // eslint-disable-next-line no-throw-literal
      throw `unknown render target "${target}"`;
  }
}
