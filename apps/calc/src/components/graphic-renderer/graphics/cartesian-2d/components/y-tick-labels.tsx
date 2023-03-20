import { G, Rect, Text } from "@react-pdf/renderer";
import classNames from "classnames";
import { RenderTarget } from "../../../graphic-renderer.types";
import {
  TickLabelPosition,
  TickLabelPositionType,
} from "../utils/calculate-tick-label-positions";

export interface YTickLabelsProps {
  tickLabelPositions: TickLabelPosition[];
  target: RenderTarget;
}

export default function YTickLabels({
  tickLabelPositions,
  target,
}: YTickLabelsProps) {
  switch (target) {
    case "web":
      return (
        <g>
          {tickLabelPositions.map(
            ({ position, type, value, hitbox }, index) => (
              <g>
                <rect
                  x={hitbox.x}
                  y={hitbox.y}
                  width={hitbox.wdith}
                  height={hitbox.height}
                  className={classNames(
                    "theme-dark:fill-neutral-800",
                    "theme-light:fill-neutral-100"
                  )}
                />
                <text
                  key={index}
                  x={position.x}
                  y={position.y}
                  dy={0.04 / 3}
                  textAnchor={
                    type === TickLabelPositionType.Primary ? "end" : "start"
                  }
                  className={classNames(
                    "theme-light:fill-black",
                    "theme-dark:fill-white",
                    ""
                  )}
                  style={{
                    fontSize: 0.04,
                  }}
                >
                  {value.toString().replace(".", ",")}
                </text>
              </g>
            )
          )}
        </g>
      );

    case "pdf":
      return (
        <G>
          {tickLabelPositions.map(
            ({ position, type, value, hitbox }, index) => (
              <G>
                <Rect
                  x={hitbox.x}
                  y={hitbox.y}
                  width={hitbox.wdith}
                  height={hitbox.height}
                  style={{
                    fill: "white",
                  }}
                />
                <Text
                  key={index}
                  x={position.x}
                  y={position.y + 0.04 / 3}
                  textAnchor={
                    type === TickLabelPositionType.Primary ? "end" : "start"
                  }
                  style={{
                    fill: "black",
                    fontSize: 0.04,
                  }}
                >
                  {value.toString().replace(".", ",")}
                </Text>
              </G>
            )
          )}
        </G>
      );
  }
}
