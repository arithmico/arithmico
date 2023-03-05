import classNames from "classnames";
import { Target } from "@local-components/graphic/graphic-container";
import { Svg } from "@react-pdf/renderer";

interface GraphicSvgProps {
  viewBox: string;
  target: Target;
  children: JSX.Element;
}

export default function GraphicSvg({
  viewBox,
  target,
  children,
}: GraphicSvgProps) {
  switch (target) {
    case "web":
      return (
        <svg viewBox={viewBox} className={classNames("max-h-full")}>
          {children}
        </svg>
      );
    case "pdf":
      return (
        <Svg
          viewBox={viewBox}
          style={{
            borderColor: "black",
            borderWidth: 1,
          }}
          width={"auto"}
          height={"400px"}
        >
          {children}
        </Svg>
      );
  }
}
