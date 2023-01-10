import { Limits } from "./graphic";
import XAxis from "./x-axis";
import YAxis from "./y-axis";

interface CoordinateGridProps {
  limits: Limits;
  xTicks: number;
  yTicks: number;
}

export default function CoordinateGrid({
  limits,
  xTicks,
  yTicks,
}: CoordinateGridProps) {
  const [xMin, yMin, xMax, yMax] = limits;

  return (
    <>
      {yMin <= 0 && yMax >= 0 && <XAxis limits={limits} xTicks={xTicks} />}
      {xMin <= 0 && xMax >= 0 && <YAxis limits={limits} yTicks={yTicks} />}
    </>
  );
}
