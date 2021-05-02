import {SyntaxTreeNode} from "../types.js"

export type UnaryOperationEvaluator<ItemType extends SyntaxTreeNode> = (item: ItemType) => SyntaxTreeNode;
export type BinaryOperationEvaluator<LeftItemType extends SyntaxTreeNode,
    RightItemType extends SyntaxTreeNode> = (leftItem: LeftItemType, rightItem: RightItemType) => SyntaxTreeNode;

export enum OperatorType {
    Unary,
    Binary
}

export type UnaryOperator = {
    type: OperatorType.Unary,
    overloads: {
        [itemType: string]: UnaryOperationEvaluator<any>
    }
};

export type BinaryOperator = {
    type: OperatorType.Binary,
    overloads: {
        [leftItemType: string]: {
            [rightItemType: string]: BinaryOperationEvaluator<any, any>
        }
    }
};

export type Operator = UnaryOperator | BinaryOperator;
export type OperatorSet = {
    [operatorName: string]: Operator
}