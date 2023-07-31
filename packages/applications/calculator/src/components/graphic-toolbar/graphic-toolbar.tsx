import classNames from "classnames";
import { GraphicNode } from "engine/lib/types/graphics.types";
import { GraphicToolbarExportMenu } from "./graphic-toolbar-export-menu";

interface GraphicOutputToolbarProps {
  graphic: GraphicNode;
  input: string;
}

export function GraphicToolbar({ graphic, input }: GraphicOutputToolbarProps) {
  return (
    <div className={classNames("absolute", "right-0", "top-0", "mt-2", "mr-2")}>
      <GraphicToolbarExportMenu graphic={graphic} input={input} />
    </div>
  );
}
