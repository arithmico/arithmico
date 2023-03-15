import { GraphicNode } from "@arithmico/engine/lib/types";
import SvgGraphicContainer from "../components/svg-graphic-container";
import { GraphicDimensions, RenderTarget } from "../graphic-renderer.types";
import Cartesian2DGraphic from "../graphics/cartesian-2d-graphic";

export interface GraphicFixedSizeHandlerProps {
  target: RenderTarget;
  dimensions: GraphicDimensions;
  graphic: GraphicNode;
}

export default function GraphicFixedSizeHandler({
  target,
  dimensions,
  graphic,
}: GraphicFixedSizeHandlerProps) {
  const normalizedDimensions: GraphicDimensions = {
    width: 1,
    height: dimensions.height / dimensions.width,
  };

  return (
    <SvgGraphicContainer
      dimensions={dimensions}
      absoluteDimensions={dimensions}
      target={target}
    >
      {(() => {
        switch (graphic.graphicType) {
          case "cartesian2D":
            return (
              <Cartesian2DGraphic
                dimensions={normalizedDimensions}
                graphic={graphic}
                target={target}
              />
            );
        }
      })()}
    </SvgGraphicContainer>
  );
}
