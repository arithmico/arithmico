import { GraphicNode } from "engine/lib/types";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import GraphicFixedSizeHandler from "./graphic-fixed-size-handler";

interface GraphicDynamicSizeHandlerProps {
  graphic: GraphicNode;
  braille: boolean;
  aspectRatio?: string;
}

export type Target = "web" | "pdf";

export default function GraphicDynamicSizeHandler({
  graphic,
  braille,
  aspectRatio,
}: GraphicDynamicSizeHandlerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [viewBoxWidth, setViewBoxWidth] = useState(1);
  const [viewBoxHeight, setViewBoxHeight] = useState(1);

  const setDimensions = useCallback(() => {
    if (ref.current) {
      setViewBoxWidth(ref.current.clientWidth);
      setViewBoxHeight(ref.current.clientHeight);
    }
  }, [setViewBoxWidth, setViewBoxHeight, ref]);

  useEffect(() => {
    if (ref.current) {
      setViewBoxWidth(ref.current.clientWidth);
      setViewBoxHeight(ref.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    setDimensions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aspectRatio]);

  useEffect(() => {
    window.addEventListener("resize", setDimensions);

    return () => {
      window.removeEventListener("resize", setDimensions);
    };
  }, [setDimensions]);

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
      <GraphicFixedSizeHandler
        graphic={graphic}
        dimensions={{
          width: viewBoxWidth,
          height: viewBoxHeight,
        }}
        target={"web"}
        braille={braille}
      />
    </div>
  );
}
