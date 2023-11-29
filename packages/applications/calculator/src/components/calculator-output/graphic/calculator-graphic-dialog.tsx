import { Dialog } from "@headlessui/react";
import classNames from "classnames";
import { GraphicResult } from "engine/lib/types";
import { useState } from "react";
import GraphicDynamicSizeHandler from "../../graphic-renderer/size-handlers/graphic-dynamic-size-handler";
import { GraphicToolbar } from "../../graphic-toolbar/graphic-toolbar";
import {
  GRAPHIC_LANDSCAPE_HEIGHT,
  GRAPHIC_LANDSCAPE_WIDTH,
  GRAPHIC_PORTRAIT_HEIGHT,
  GRAPHIC_PORTRAIT_WIDTH,
} from "../../pdf-graphic/pdf-graphic";

interface CalculatorGraphicDialogProps {
  output: GraphicResult & { input: string };
  isOpen: boolean;
  onClose: () => void;
}

const landscapeAspectRatio = `${(
  GRAPHIC_LANDSCAPE_WIDTH / GRAPHIC_LANDSCAPE_HEIGHT
).toFixed(2)}/1`;
const portraitAspectRatio = `1/${
  GRAPHIC_PORTRAIT_HEIGHT / GRAPHIC_PORTRAIT_WIDTH
}`;

export function CalculatorGraphicDialog({
  output,
  isOpen,
  onClose,
}: CalculatorGraphicDialogProps) {
  const [isLandscape, setIsLandscape] = useState(false);
  const toggleAspectRatio = () => setIsLandscape(!isLandscape);

  const aspectRatio = isLandscape ? landscapeAspectRatio : portraitAspectRatio;

  return (
    <Dialog onClose={onClose} open={isOpen} className="absolute inset-0 z-20">
      <div className="flex h-full w-full flex-col items-center justify-center bg-black/50">
        <Dialog.Panel className="h-[90%]">
          <div
            className={classNames(
              "theme-dark:bg-neutral-800",
              "theme-light:bg-neutral-100",
              "rounded-md",
              "p-4",
              "grid",
              "grid-rows-[auto_1fr]",
              "h-full",
              "relative"
            )}
          >
            <div className="flex items-center">
              <Dialog.Title className="overflow-clip whitespace-nowrap     text-ellipsis min-w-0 text-3xl theme-dark:text-white theme-light:text-black">
                {output.input}
              </Dialog.Title>
              <GraphicToolbar
                toggleAspectRatio={toggleAspectRatio}
                onClose={onClose}
                graphic={output.graphic}
                input={output.input}
                isLandscape={isLandscape}
              />
            </div>
            <div className="h-full min-h-0 flex justify-center">
              <div
                className={classNames("min-h-0", "h-full")}
                style={{
                  aspectRatio: aspectRatio,
                }}
              >
                <GraphicDynamicSizeHandler
                  graphic={output.graphic}
                  braille={false}
                  aspectRatio={isLandscape ? "landscape" : "portrait"}
                />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
