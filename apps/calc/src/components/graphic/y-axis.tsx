import classNames from "classnames";
import { convertToViewPortCoordinates, Limits } from "./graphic";

interface YAxisProps {
  limits: Limits;
  yTicks: number;
}

export default function YAxis({ limits, yTicks }: YAxisProps) {
  const startPoint = convertToViewPortCoordinates([0, limits[1]], limits);
  const endPoint = convertToViewPortCoordinates([0, limits[3]], limits);
  const arrowPoints = [
    [endPoint[0], endPoint[1] - 10],
    [endPoint[0] - 3, endPoint[1]],
    [endPoint[0] + 3, endPoint[1]],
  ]
    .map((p) => p.join(","))
    .join(" ");

  return (
    <>
      <line
        x1={startPoint[0]}
        y1={startPoint[1]}
        x2={endPoint[0]}
        y2={endPoint[1]}
        className={classNames("stroke-white", "stroke-1")}
      />
      <polygon points={arrowPoints} className={classNames("fill-white")} />
    </>
  );
}
