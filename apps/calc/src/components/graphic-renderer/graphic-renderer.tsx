import { GraphicNode } from "@arithmico/engine/lib/types";
import SvgGraphicContainer from "./components/svg-graphic-container";
import { GraphicDimensions, RenderTarget } from "./graphic-renderer.types";
import Cartesian2DGraphic from "./graphics/cartesian-2d-graphic";

export interface GraphicRendererProps {
  target: RenderTarget;
  dimensions: GraphicDimensions;
  graphic: GraphicNode;
}

export default function GraphicRenderer({
  target,
  dimensions,
  graphic,
}: GraphicRendererProps) {
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
