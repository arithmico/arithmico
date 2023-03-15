import { GraphicNode } from "@arithmico/engine/lib/types";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import GraphicDimensionsNormalizer from "./graphic-dimensions-normalizer";

interface GraphicContainerProps {
  graphic: GraphicNode;
}

export type Target = "web" | "pdf";

export default function GraphicContainer({ graphic }: GraphicContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [viewBoxWidth, setViewBoxWidth] = useState(1);
  const [viewBoxHeight, setViewBoxHeight] = useState(1);

  useEffect(() => {
    if (ref.current) {
      setViewBoxWidth(ref.current.clientWidth);
      setViewBoxHeight(ref.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    const setDimensions = () => {
      if (ref.current) {
        setViewBoxWidth(ref.current.clientWidth);
        setViewBoxHeight(ref.current.clientHeight);
      }
    };

    window.addEventListener("resize", setDimensions);

    return () => {
      window.removeEventListener("resize", setDimensions);
    };
  }, [setViewBoxWidth, setViewBoxHeight, ref]);

  return (
    <div
      ref={ref}
      className={classNames(
        "grid",
        "overflow-hidden",
        "w-full",
        "h-full",
        "max-h-full",
        "max-w-full",
        "items-center",
        "justify-center"
      )}
    >
      <GraphicDimensionsNormalizer
        graphic={graphic}
        dimensions={{
          width: viewBoxWidth,
          height: viewBoxHeight,
        }}
        target={"web"}
      />
    </div>
  );
}
