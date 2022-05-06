import { SyntaxTreeNode } from "../../../../types";
import { convertOperatorChainToList } from "../../../../utils/symbolic-utils";

export function getFactors(summand: SyntaxTreeNode) {
  return  convertOperatorChainToList("times", summand);
}