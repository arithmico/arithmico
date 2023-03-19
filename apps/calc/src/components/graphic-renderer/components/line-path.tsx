import { RenderTarget } from "@local-components/graphic-renderer/graphic-renderer.types";
import { Path } from "@react-pdf/renderer";
import classNames from "classnames";
import { LinePathPositions } from "../graphics/cartesian-2d/utils/calculate-line-paths";

export type LinePathProps = LinePathPositions & {
  target: RenderTarget;
};

export default function LinePath({ points, target }: LinePathProps) {
  const pathString = points
    .map(({ x, y }, index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
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
