import { G, Rect, Text } from "@react-pdf/renderer";
import classNames from "classnames";
import { convertToBraille } from "../../../../../utils/convert-to-braille";
import { RenderTarget } from "../../../graphic-renderer.types";
import { TickLabelPosition } from "../utils/calculate-tick-label-positions";
import { getTickLabelStyles } from "../utils/get-tick-label-styles";

export interface XTickLabelsProps {
  tickLabelPositions: TickLabelPosition[];
  target: RenderTarget;
  braille: boolean;
}

export default function XTickLabels({
  tickLabelPositions,
  target,
  braille,
}: XTickLabelsProps) {
  const fontStyles = getTickLabelStyles(braille);

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
                    style={{
                      stroke: "yellow",
                      strokeWidth: 0.001,
                    }}
                    className={classNames(
                      "theme-dark:fill-neutral-800",
                      "theme-light:fill-neutral-100"
                    )}
                  />
                  <text
                    x={position.x}
                    y={position.y + 0.04 / 3}
                    textAnchor="middle"
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
                      stroke: "yellow",
                      strokeWidth: 0.001,
                    }}
                  />
                  <Text
                    x={position.x}
                    y={position.y + 0.04 / 3}
                    textAnchor="middle"
                    style={{
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
