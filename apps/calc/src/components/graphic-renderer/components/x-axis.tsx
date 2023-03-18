import classNames from "classnames";
import {
  GraphicDimensions,
  GraphicLimits,
  RenderTarget,
  Ticks,
} from "../graphic-renderer.types";
import { transformToSvgViewport } from "../graphic-utils";

export interface XAxisProps {
  dimensions: GraphicDimensions;
  limits: GraphicLimits;
  ticks: Ticks;
  target: RenderTarget;
}

export default function XAxis({
  dimensions,
  limits,
  ticks,
  target,
}: XAxisProps) {
  if (limits.yMin > 0 || limits.yMax < 0) {
    console.log("early return");
    return <></>;
  }

  const startPoint = transformToSvgViewport(
    {
      x: limits.xMin,
      y: 0,
    },
    dimensions,
    limits
  );

  const endPoint = transformToSvgViewport(
    {
      x: limits.xMax,
      y: 0,
    },
    dimensions,
    limits
  );

  switch (target) {
    case "web":
      return (
        <line
          x1={startPoint.x}
          y1={startPoint.y}
          x2={endPoint.x}
          y2={endPoint.y}
          className={classNames(
            "theme-light:stroke-black",
            "theme-dark:stroke-white",
            "stroke-[0.005]"
          )}
        ></line>
      );

    case "pdf":
      return <></>;
  }
}
