import { GraphicNode } from "@arithmico/engine/lib/types";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import GraphicRenderer from "@local-components/graphic/graphic-renderer";
import { ViewBoxDimension } from "@local-components/graphic/graphic-utils";

interface GraphicContainerProps {
  graphic: GraphicNode;
}

export default function GraphicContainer({ graphic }: GraphicContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [viewBoxWidth, setViewBoxWidth] = useState(1);
  const [viewBoxHeight, setViewBoxHeight] = useState(1);

  const setDimensions = () => {
    if (ref.current) {
      setViewBoxWidth(ref.current.offsetWidth);
      setViewBoxHeight(ref.current.offsetHeight);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(setDimensions, [ref.current]);

  const viewBoxDimension: ViewBoxDimension = {
    viewBoxWidth: viewBoxWidth,
    viewBoxHeight: viewBoxHeight,
  };

  return (
    <div
      ref={ref}
      onResize={setDimensions}
      className={classNames(
        "flex",
        "w-full",
        "h-full",
        "items-center",
        "justify-center"
      )}
    >
      <GraphicRenderer graphic={graphic} viewBoxDimension={viewBoxDimension} />
    </div>
  );
}
