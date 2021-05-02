import {
    BinaryOperationEvaluator,
    BinaryOperator,
    OperatorType,
    UnaryOperationEvaluator,
    UnaryOperator
} from "./types.js";
import {SyntaxTreeNode} from "../types.js";

export const createUnaryOperator = (): UnaryOperator => ({
    type: OperatorType.Unary,
    overloads: {}
});

export const createBinaryOperator = (): BinaryOperator => ({
    type: OperatorType.Binary,
    overloads: {}
});

export const addUnaryOperatorOverload = <ItemType extends SyntaxTreeNode>(
    operator: UnaryOperator,
    itemType: ItemType["type"],
    evaluator: UnaryOperationEvaluator<ItemType>
) => {
    if (operator.overloads[itemType])
        throw `operator is already overloaded for type ${itemType}`;

    operator.overloads[itemType] = evaluator;
};

export const addBinaryOperatorOverload = <LeftItemType extends SyntaxTreeNode,
    RightItemType extends SyntaxTreeNode>(
        operator: BinaryOperator,
        leftType: LeftItemType["type"],
        rightType: RightItemType["type"],
        evaluator: BinaryOperationEvaluator<LeftItemType, RightItemType>
) => {
    if (!operator.overloads[leftType])
        return operator.overloads[leftType] = {[rightType]: evaluator};

    if (operator.overloads[leftType][rightType])
        throw `operator is already overloaded for types (${leftType}, ${rightType})`;

    operator.overloads[leftType][rightType] = evaluator;
};
