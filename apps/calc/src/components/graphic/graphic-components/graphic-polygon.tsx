import classNames from "classnames";
import { Polygon } from "@react-pdf/renderer";
import { Target } from "@local-components/graphic/graphic-container";

interface GraphicPolygonProps {
  points: string;
  target: Target;
}

export default function GraphicPolygon({
  points,
  target,
}: GraphicPolygonProps) {
  switch (target) {
    case "web":
      return (
        <polygon
          points={points}
          className={classNames(
            "theme-light:fill-black",
            "theme-dark:fill-white"
          )}
        />
      );
    case "pdf":
      return <Polygon points={points} />;
  }
}
