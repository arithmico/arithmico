import { RenderTarget } from "@local-components/graphic-renderer/graphic-renderer.types";
import { Path } from "@react-pdf/renderer";
import classNames from "classnames";
import { LinePathPositions } from "../utils/calculate-line-paths";

const DASH_ARRAY = "0.01,0.005";

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
        <>
          <path
            d={pathString}
            className={classNames(
              "stroke-[0.015]",
              "fill-none",
              "theme-light:stroke-neutral-100",
              "theme-dark:stroke-neutral-800"
            )}
          />
          <path
            d={pathString}
            className={classNames(
              "stroke-[0.005]",
              "fill-none",
              "theme-light:stroke-black",
              "theme-dark:stroke-white"
            )}
            strokeDasharray={DASH_ARRAY}
          />
        </>
      );

    case "pdf":
      return (
        <>
          <Path
            d={pathString}
            style={{ strokeWidth: 0.015, stroke: "white", fill: "none" }}
          />
          <Path
            d={pathString}
            style={{ strokeWidth: 0.005, stroke: "black", fill: "none" }}
            strokeDasharray={DASH_ARRAY}
          />
        </>
      );

    default:
      // eslint-disable-next-line no-throw-literal
      throw `unknown render target "${target}"`;
  }
}
