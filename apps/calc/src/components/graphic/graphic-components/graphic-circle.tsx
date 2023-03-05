import classNames from "classnames";
import { Target } from "@local-components/graphic/graphic-container";
import { Circle } from "@react-pdf/renderer";

interface GraphicCircleProps {
  cx: number;
  cy: number;
  r: number;
  target: Target;
}

export default function GraphicCircle({ cx, cy, r, target }: GraphicCircleProps) {
  switch (target) {
    case "web":
      return (
        <circle
          cx={cx}
          cy={cy}
          r={r}
          className={classNames(
            "theme-dark:fill-white",
            "theme-light:fill-black"
          )}
        />
      );
    case "pdf":
      return <Circle cx={cx} cy={cy} r={r} />;
  }
}
