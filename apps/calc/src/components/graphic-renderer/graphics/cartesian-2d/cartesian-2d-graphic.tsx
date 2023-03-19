import { GraphicNode } from "@arithmico/engine/lib/types";
import CoordinateGrid from "../../components/coordinate-grid";
import { GraphicDimensions, RenderTarget } from "../../graphic-renderer.types";
import PlotLine from "@local-components/graphic-renderer/components/plot-line";
import { calculateAutoTicks } from "./utils/calculate-auto-ticks";
import XAxis from "../../components/x-axis";
import YAxis from "../../components/y-axis";
import { calculateGridPointPositions } from "./utils/calculate-grid-point-positions";

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
  const gridPointPositions = calculateGridPointPositions({
    limits: graphic.limits,
    ticks: autoTicks,
    dimensions,
  });

  return (
    <>
      <CoordinateGrid target={target} points={gridPointPositions} />
      <XAxis
        dimensions={dimensions}
        limits={graphic.limits}
        ticks={autoTicks}
        target={target}
      />
      <YAxis
        dimensions={dimensions}
        limits={graphic.limits}
        ticks={autoTicks}
        target={target}
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
