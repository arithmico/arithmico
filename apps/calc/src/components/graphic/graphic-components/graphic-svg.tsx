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
      return <svg viewBox={viewBox}>{children}</svg>;
    case "pdf":
      return (
        <Svg viewBox={viewBox} width={"auto"}>
          {children}
        </Svg>
      );
  }
}
