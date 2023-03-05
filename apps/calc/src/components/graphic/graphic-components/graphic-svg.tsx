import classNames from "classnames";
import {Target} from "@local-components/graphic/graphic-container";
import {Svg} from "@react-pdf/renderer";

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
          style={{ backgroundColor: "black", borderColor: "black" }}
          width={"10cm"}
          height={"20cm"}
        >
          {children}
        </Svg>
      );
  }
}
