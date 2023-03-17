import { GraphicNode } from "@arithmico/engine/lib/types";
import CoordinateGrid from "../components/coordinate-grid";
import { GraphicDimensions, RenderTarget } from "../graphic-renderer.types";
import { calculateAutoTicks } from "./calculate-auto-ticks";

export interface Cartesian2DGraphicProps {
  target: RenderTarget;
  graphic: GraphicNode;
  dimensions: GraphicDimensions;
}

export default function Cartesian2DGraphic({
  target,
  graphic,
  dimensions,
}: Cartesian2DGraphicProps): JSX.Element {
  const ticks = calculateAutoTicks({ graphic, dimensions });

  return (
    <CoordinateGrid
      dimensions={dimensions}
      target={target}
      limits={graphic.limits}
      ticks={ticks}
    />
  );
}
