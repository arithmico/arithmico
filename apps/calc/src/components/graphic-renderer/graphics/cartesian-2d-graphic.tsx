import { GraphicNode } from "@arithmico/engine/lib/types";
import CoordinateGrid from "../components/coordinate-grid";
import { GraphicDimensions, RenderTarget } from "../graphic-renderer.types";
import PlotLine from "@local-components/graphic-renderer/components/plot-line";
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
  const autoTicks = calculateAutoTicks({ graphic, dimensions });

  return (
    <>
      <CoordinateGrid
        dimensions={dimensions}
        target={target}
        limits={graphic.limits}
        ticks={autoTicks}
      />
      {graphic.lines.map(({ points }, index) => (
        <PlotLine
          points={points}
          limits={graphic.limits}
          dimension={dimensions}
          target={target}
          key={index}
        />
      ))}
    </>
  );
}
