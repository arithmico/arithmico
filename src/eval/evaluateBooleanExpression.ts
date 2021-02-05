import {isEqual} from "lodash";
import {
    And,
    Boolean, BooleanBinaryOperator, Context,
    Equal,
    GreaterThan,
    GreaterThanOrEqual,
    LessThan,
    LessThanOrEqual,
    Not,
    Number,
    Or,
    PartialOrder,
    Relation,
    SyntaxTreeNode
} from "../types.js";
import {evaluateChildren} from "../utils/evalUtils.js";
import {isBoolean, isNumber} from "../utils/typeUtils.js";
import {createBoolean} from "../create/create.js";
import evaluate from "./evaluate.js";

type BooleanOperationEvaluator = (childA: Boolean, childB: Boolean) => boolean;
type RelationEvaluator = (leftChild: SyntaxTreeNode, rightChild: SyntaxTreeNode) => boolean;
type PartialOrderEvaluator = (leftChild: Number, rightChild: Number) => boolean;

const evaluateBooleanOperation = (node: BooleanBinaryOperator, func: BooleanOperationEvaluator, context: Context) => {
    const [childA, childB] = evaluateChildren(node.children, context);

    if (!isBoolean(childA) || !isBoolean(childB))
        throw `undefined operation BooleanBinaryOperator(${childA.type}, ${childB.type})`;

    return createBoolean(func(childA as Boolean, childB as Boolean));
}

const evaluateRelation = (node: Relation, func: RelationEvaluator, context: Context) => {
    const [childA, childB] = evaluateChildren(node.children, context);
    return createBoolean(func(childA, childB));
}

const evaluatePartialOrder = (node: PartialOrder, func: PartialOrderEvaluator, context: Context) => {
    const [childA, childB] = evaluateChildren(node.children, context);
    if (!isNumber(childA) || !isNumber(childB))
        throw `undefined operation PartialOrder(${childA.type}, ${childB.type})`;

    return createBoolean(func(childA as Number, childB as Number));
};

// operators
export const evaluateAnd = (node: And, context: Context) => evaluateBooleanOperation(
    node, (childA, childB) => childA.value && childB.value, context
);

export const evaluateOr = (node: Or, context: Context) => evaluateBooleanOperation(
    node, (childA, childB) => childA.value || childB.value, context
);

export const evaluateNot = (node: Not, context: Context): Boolean => {
    const evaluatedNode = evaluate(node, context);

    if (isBoolean(evaluatedNode))
        return createBoolean(!(evaluatedNode as Boolean).value);

    throw "undefined operation";
};

// relations
export const evaluateEqual = (node: Equal, context: Context) => evaluateRelation(
    node, (childA, childB) => isEqual(childA, childB), context
);

export const evaluateLessThan = (node: LessThan, context: Context) => evaluatePartialOrder(
    node, (childA, childB) => childA.value < childB.value, context
);

export const evaluateLessThanOrEqual = (node: LessThanOrEqual, context: Context) => evaluatePartialOrder(
    node, (childA, childB) => childA.value <= childB.value, context
);

export const evaluateGreaterThan = (node: GreaterThan, context: Context) => evaluatePartialOrder(
    node, (childA, childB) => childA.value > childB.value, context
);

export const evaluateGreaterThanOrEqual = (node: GreaterThanOrEqual, context: Context) => evaluatePartialOrder(
    node, (childA, childB) => childA.value >= childB.value, context
);