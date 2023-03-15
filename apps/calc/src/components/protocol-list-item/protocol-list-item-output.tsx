import classNames from "classnames";
import { Output } from "../../../../../libs/stores/slices/calculator-session";
import GraphicContainer from "../graphic-renderer/graphic-renderer";

interface ProtocolListItemOutputProps {
  output: Output;
}

export default function ProtocolListItemOutput({
  output,
}: ProtocolListItemOutputProps) {
  switch (output.type) {
    case "text":
      return (
        <span
          className={classNames(
            "theme-light:text-black",
            "theme-dark:text-white"
          )}
        >
          {output.text}
        </span>
      );

    case "error":
      return (
        <span
          className={classNames(
            "theme-dark:text-white",
            "theme-light:text-red-700"
          )}
        >
          {output.error}
        </span>
      );

    case "graphic":
      return <GraphicContainer graphic={output.graphic} />;

    default:
      // @ts-ignore
      return <span>unknown output type "{output.type}"</span>;
  }
}
