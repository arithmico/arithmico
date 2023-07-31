import { G, Rect, Text } from "@react-pdf/renderer";
import classNames from "classnames";
import { convertToBraille } from "../../../../../utils/convert-to-braille";
import { RenderTarget } from "../../../graphic-renderer.types";
import {
  TickLabelPosition,
  TickLabelPositionType,
} from "../utils/calculate-tick-label-positions";
import {
  getTickLabelDebugStyles,
  getTickLabelStyles,
} from "../utils/get-tick-label-styles";

export interface YTickLabelsProps {
  tickLabelPositions: TickLabelPosition[];
  target: RenderTarget;
  braille: boolean;
}

export default function YTickLabels({
  tickLabelPositions,
  target,
  braille,
}: YTickLabelsProps) {
  const fontStyles = getTickLabelStyles(braille);
  const debugStyles = getTickLabelDebugStyles(false);

  switch (target) {
    case "web":
      return (
        <g>
          {tickLabelPositions.map(
            ({ position, type, value, hitbox }, index) => {
              const text = value.toString().replace(".", ",");
              return (
                <g key={index}>
                  <rect
                    x={hitbox.x}
                    y={hitbox.y}
                    width={hitbox.wdith}
                    height={hitbox.height}
                    style={debugStyles}
                    className={classNames(
                      "theme-dark:fill-neutral-800",
                      "theme-light:fill-neutral-100"
                    )}
                  />
                  <text
                    x={position.x}
                    y={position.y + fontStyles.fontSize / 3}
                    textAnchor={
                      type === TickLabelPositionType.Primary ? "end" : "start"
                    }
                    className={classNames(
                      "theme-light:fill-black",
                      "theme-dark:fill-white"
                    )}
                    style={{
                      ...fontStyles,
                    }}
                  >
                    {braille ? convertToBraille(text) : text}
                  </text>
                </g>
              );
            }
          )}
        </g>
      );

    case "pdf":
      return (
        <G>
          {tickLabelPositions.map(
            ({ position, type, value, hitbox }, index) => {
              const text = value.toString().replace(".", ",");

              return (
                <G key={index}>
                  <Rect
                    x={hitbox.x}
                    y={hitbox.y}
                    width={hitbox.wdith}
                    height={hitbox.height}
                    style={{
                      fill: "white",
                      ...debugStyles,
                    }}
                  />
                  <Text
                    x={position.x}
                    y={position.y + fontStyles.fontSize / 3}
                    textAnchor={
                      type === TickLabelPositionType.Primary ? "end" : "start"
                    }
                    style={{
                      fill: "black",
                      ...fontStyles,
                    }}
                  >
                    {braille ? convertToBraille(text) : text}
                  </Text>
                </G>
              );
            }
          )}
        </G>
      );
  }
}
