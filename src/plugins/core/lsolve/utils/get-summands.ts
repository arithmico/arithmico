import { Equals, SyntaxTreeNode } from "../../../../types";
import { convertOperatorChainToList } from "../../../../utils/symbolic-utils";

export function getSummands(equation: Equals): SyntaxTreeNode[] {
  return convertOperatorChainToList("plus", equation.left);
}