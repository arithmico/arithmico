import {Context, SyntaxTreeNode} from "../types";
import {
    evaluateAnd,
    evaluateEqual,
    evaluateGreaterThan,
    evaluateGreaterThanOrEqual,
    evaluateLessThan,
    evaluateLessThanOrEqual,
    evaluateNot,
    evaluateOr
} from "./evaluateBooleanExpression";
import {evaluateBoolean, evaluateNumber, evaluateSymbol} from "./evaluatePrimitives.js";

const evaluate = (node: SyntaxTreeNode, context: Context): SyntaxTreeNode => {
    switch (node.type) {
        case "Number":
            return evaluateNumber(node);
        case "Symbol":
            return evaluateSymbol(node, context);
        case "Boolean":
            return evaluateBoolean(node);

        case "And":
            return evaluateAnd(node, context);
        case "Or":
            return evaluateOr(node, context);
        case "Not":
            return evaluateNot(node, context);
        case "Equal":
            return evaluateEqual(node, context);
        case "LessThan":
            return evaluateLessThan(node, context);
        case "LessThanOrEqual":
            return evaluateLessThanOrEqual(node, context);
        case "GreaterThan":
            return evaluateGreaterThan(node, context);
        case "GreaterThanOrEqual":
            return evaluateGreaterThanOrEqual(node, context);

        default:
            throw `unknown node type "${node.type}"`;
    }
}

export default evaluate;