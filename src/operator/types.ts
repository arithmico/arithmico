import {SyntaxTreeNode} from "../types.js"

export type UnaryOperationEvaluator<ItemType extends SyntaxTreeNode> = (item: ItemType) => SyntaxTreeNode;
export type BinaryOperationEvaluator<LeftItemType extends SyntaxTreeNode,
    RightItemType extends SyntaxTreeNode> = (leftItem: LeftItemType, rightItem: RightItemType) => SyntaxTreeNode;
export type GenericOperationEvaluator = (item: SyntaxTreeNode) => SyntaxTreeNode;

export enum OperatorType {
    Unary,
    Binary,
    Generic
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

export type GenericOperator = {
    type: OperatorType.Generic,
    evaluator: GenericOperationEvaluator
}

export type Operator = UnaryOperator | BinaryOperator | GenericOperator;
export type OperatorSet = {
    [operatorName: string]: Operator
}