import { GraphicNode } from "@arithmico/engine/lib/types";

interface GraphicProps {
  graphic: GraphicNode;
}

export default function Graphic({ graphic }: GraphicProps) {
  return <div>{graphic.graphicType}</div>;
}
