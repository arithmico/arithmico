import ExportButton from "./export-button";
import { GraphicNode } from "@arithmico/engine/lib/types/graphics.types";

interface GraphicOutputToolbarProps {
  graphic: GraphicNode;
}

export default function GraphicOutputToolbar({
  graphic,
}: GraphicOutputToolbarProps) {
  return (
    <div>
      <ExportButton graphic={graphic} />
    </div>
  );
}
