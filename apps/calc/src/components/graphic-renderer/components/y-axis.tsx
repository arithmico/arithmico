import classNames from "classnames";
import {
  GraphicDimensions,
  GraphicLimits,
  RenderTarget,
  Ticks,
} from "../graphic-renderer.types";
import { transformToSvgViewport } from "../graphic-utils";

export interface YAxisProps {
  dimensions: GraphicDimensions;
  limits: GraphicLimits;
  ticks: Ticks;
  target: RenderTarget;
}

export default function YAxis({
  dimensions,
  limits,
  ticks,
  target,
}: YAxisProps) {
  if (limits.yMin > 0 || limits.yMax < 0) {
    console.log("early return");
    return <></>;
  }

  const startPoint = transformToSvgViewport(
    {
      x: 0,
      y: limits.yMin,
    },
    dimensions,
    limits
  );

  const endPoint = transformToSvgViewport(
    {
      x: 0,
      y: limits.yMax,
    },
    dimensions,
    limits
  );

  console.log(startPoint, endPoint);

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
