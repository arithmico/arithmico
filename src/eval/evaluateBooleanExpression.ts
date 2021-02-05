import {isEqual} from "lodash";
import {
    And,
    Boolean, BooleanBinaryOperator,
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

const evaluateBooleanOperation = (node: BooleanBinaryOperator, func: BooleanOperationEvaluator) => {
    const [childA, childB] = evaluateChildren(node.children);

    if (!isBoolean(childA) || !isBoolean(childB))
        throw `undefined operation BooleanBinaryOperator(${childA.type}, ${childB.type})`;

    return createBoolean(func(childA as Boolean, childB as Boolean));
}

const evaluateRelation = (node: Relation, func: RelationEvaluator) => {
    const [childA, childB] = evaluateChildren(node.children);
    return createBoolean(func(childA, childB));
}

const evaluatePartialOrder = (node: PartialOrder, func: PartialOrderEvaluator) => {
    const [childA, childB] = evaluateChildren(node.children);
    if (!isNumber(childA) || !isNumber(childB))
        throw `undefined operation PartialOrder(${childA.type}, ${childB.type})`;

    return createBoolean(func(childA as Number, childB as Number));
};

// operators
export const evaluateAnd = (node: And) => evaluateBooleanOperation(
    node, (childA, childB) => childA.value && childB.value
);

export const evaluateOr = (node: Or) => evaluateBooleanOperation(
    node, (childA, childB) => childA.value || childB.value
);

export const evaluateNot = (node: Not): Boolean => {
    const evaluatedNode = evaluate(node);

    if (isBoolean(evaluatedNode))
        return createBoolean(!(evaluatedNode as Boolean).value);

    throw "undefined operation";
};

// relations
export const evaluateEqual = (node: Equal) => evaluateRelation(
    node, (childA, childB) => isEqual(childA, childB)
);

export const evaluateLessThan = (node: LessThan) => evaluatePartialOrder(
    node, (childA, childB) => childA.value < childB.value
);

export const evaluateLessThanOrEqual = (node: LessThanOrEqual) => evaluatePartialOrder(
    node, (childA, childB) => childA.value <= childB.value
);

export const evaluateGreaterThan = (node: GreaterThan) => evaluatePartialOrder(
    node, (childA, childB) => childA.value > childB.value
);

export const evaluateGreaterThanOrEqual = (node: GreaterThanOrEqual) => evaluatePartialOrder(
    node, (childA, childB) => childA.value >= childB.value
);