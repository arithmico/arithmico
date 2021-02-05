import { SyntaxTreeNode } from "../types";
import { evaluateAnd, evaluateNot, evaluateOr } from "./evaluateBooleanExpression";
import { evaluateBoolean, evaluateNumber, evaluateSymbol } from "./evaluatePrimitives.js";

const evaluate = (node: SyntaxTreeNode): SyntaxTreeNode => {
    switch (node.type) {
        case "Number": return evaluateNumber(node);
        case "Symbol": return evaluateSymbol(node);
        case "Boolean": return evaluateBoolean(node);

        case "And": return evaluateAnd(node);
        case "Or": return evaluateOr(node);
        case "Not": return evaluateNot(node);

        default: throw `unknown node type "${node.type}"`;
    }
}

export default evaluate;