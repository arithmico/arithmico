import {SyntaxTreeNode} from "../types.js"

export type UnaryOperationEvaluator = <ItemType extends SyntaxTreeNode>(item: ItemType) => SyntaxTreeNode;
export type BinaryOperationEvaluator = <LeftItemType extends SyntaxTreeNode,
    RightItemType extends SyntaxTreeNode>(leftItem: LeftItemType, rightItem: RightItemType) => SyntaxTreeNode;

export enum OperatorType {
    Unary,
    Binary
}

export type UnaryOperator = {
    type: OperatorType.Unary,
    overloads: {
        [itemType in SyntaxTreeNode["type"]]: UnaryOperationEvaluator
    }
};

export type BinaryOperator = {
    type: OperatorType.Unary,
    overloads: {
        [leftItemType in SyntaxTreeNode["type"]]: {
            [rightItemType in SyntaxTreeNode["type"]]: BinaryOperationEvaluator
        }
    }
};

export type Operator = UnaryOperator | BinaryOperator;
export type OperatorSet = {
    [operatorName: string]: Operator
}