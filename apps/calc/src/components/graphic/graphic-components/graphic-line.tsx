import classNames from "classnames";
import { Target } from "@local-components/graphic/graphic-container";
import { Line } from "@react-pdf/renderer";

interface GraphicLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  target: Target;
}

export default function GraphicLine({
  x1,
  y1,
  x2,
  y2,
  target,
}: GraphicLineProps) {
  switch (target) {
    case "web":
      return (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          className={classNames(
            "stroke-1",
            "theme-light:stroke-black",
            "theme-dark:stroke-white"
          )}
        />
      );
    case "pdf":
      return (
        <Line
          x1={x1}
          x2={x2}
          y1={y1}
          y2={y2}
          style={{ strokeWidth: "1", stroke: "black" }}
        />
      );
  }
}
