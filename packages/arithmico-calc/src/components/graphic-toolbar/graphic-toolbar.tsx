import classNames from "classnames";
import { GraphicNode } from "@arithmico/engine/lib/types/graphics.types";
import GraphicExportButton from "./graphic-export-button";

interface GraphicOutputToolbarProps {
  graphic: GraphicNode;
  input: string;
}

export function GraphicToolbar({ graphic, input }: GraphicOutputToolbarProps) {
  return (
    <div className={classNames("absolute", "right-0", "top-0")}>
      <GraphicExportButton graphic={graphic} input={input} />
    </div>
  );
}
