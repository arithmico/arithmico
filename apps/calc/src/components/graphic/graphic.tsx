import { GraphicNode } from "@arithmico/engine/lib/types";
import classNames from "classnames";

const viewBoxHeight = 1;
const viewBoxWidth = Math.SQRT2;
const viewBox = `${-viewBoxWidth / 2} ${-viewBoxHeight / 2} ${
  viewBoxWidth / 2
} ${viewBoxHeight / 2}`;

interface GraphicProps {
  graphic: GraphicNode;
}

export default function Graphic({ graphic }: GraphicProps) {
  return (
    <div
      className={classNames(
        "flex",
        "w-full",
        "h-full",
        "max-h-full",
        "items-center",
        "justify-center"
      )}
    >
      <svg
        viewBox={viewBox}
        preserveAspectRatio="meet"
        className={classNames("border", "border-blue-700", "max-h-full")}
      >
        {graphic.graphicType}
      </svg>
    </div>
  );
}
