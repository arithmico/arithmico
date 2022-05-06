import { Context, Equals, SyntaxTreeNode } from "../../../../types";
import { containsVariables, convertOperatorChainToList, getVariableNames } from "../../../../utils/symbolic-utils";

function getSummands(equation: Equals): SyntaxTreeNode[] {
  return convertOperatorChainToList("plus", equation.left);
}

function isSummandLinear(summand: SyntaxTreeNode, context: Context): boolean {
  const factors = convertOperatorChainToList("times", summand);

  if (!containsVariables(summand, context)) {
    return true;
  }

  if (getVariableNames(summand, context).length > 1) {
    return false;
  }

  return factors.every(factor => {
    if (!containsVariables(factor, context)) {
      return true;
    }

    if (getVariableNames(factor, context).length > 1) {
      return false;
    }

    if (factor.type === "power" && containsVariables(factor.left, context) && (factor.right.type !== "number" || factor.right.value !== 1) ) {
      return false;
    }
  })
}

export function isEquationLinear(node: Equals, context: Context): boolean {
  return getSummands(node).every(summand => isSummandLinear(summand, context))
}