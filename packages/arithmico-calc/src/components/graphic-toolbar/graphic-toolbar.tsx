import classNames from "classnames";
import { GraphicNode } from "@arithmico/engine/lib/types/graphics.types";
import { GraphicToolbarExportMenu } from "./graphic-toolbar-export-menu";

interface GraphicOutputToolbarProps {
  graphic: GraphicNode;
  input: string;
}

export function GraphicToolbar({ graphic, input }: GraphicOutputToolbarProps) {
  return (
    <div className={classNames("absolute", "right-0", "top-0")}>
      <GraphicToolbarExportMenu graphic={graphic} input={input} />
    </div>
  );
}
