import {BinaryOperatorNode, Number, SyntaxTreeNode} from "types";

const createBinaryOperator = (type: string, left: SyntaxTreeNode, right: SyntaxTreeNode): BinaryOperatorNode => {
    return {
        type,
        children: [left, right]
    } as BinaryOperatorNode;
};

export const createNumber = (value: number): Number => {
    return {
        type: "Number",
        value
    };
};



