import GraphicExportButton from "./graphic-export-button";
import { GraphicNode } from "@arithmico/engine/lib/types/graphics.types";

interface GraphicOutputToolbarProps {
  graphic: GraphicNode;
  input: string;
}

export default function GraphicOutputToolbar({
  graphic,
  input,
}: GraphicOutputToolbarProps) {
  return (
    <div>
      <GraphicExportButton graphic={graphic} input={input} />
    </div>
  );
}
