import GraphicExportButton from "./graphic-export-button";
import { GraphicNode } from "@arithmico/engine/lib/types/graphics.types";

interface GraphicOutputToolbarProps {
  graphic: GraphicNode;
}

export default function GraphicOutputToolbar({
  graphic,
}: GraphicOutputToolbarProps) {
  return (
    <div>
      <GraphicExportButton graphic={graphic} />
    </div>
  );
}
