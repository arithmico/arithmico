import { Target } from "@local-components/graphic/graphic-container";
import classNames from "classnames";
import { Path } from "@react-pdf/renderer";

interface GraphicPathProps {
  d: string;
  target: Target;
}

export default function GraphicPath({ d, target }: GraphicPathProps) {
  switch (target) {
    case "web":
      return (
        <path
          d={d}
          className={classNames(
            "stroke-1",
            "fill-none",
            "theme-dark:stroke-white",
            "theme-light:stroke-black"
          )}
        />
      );
    case "pdf":
      return <Path d={d} />;
  }
}
