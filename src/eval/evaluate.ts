import {Operator, OperatorSet, OperatorType} from "../operator/types.js";
import {AbstractBinaryOperatorNode, AbstractUnaryOperatorNode, Context, SyntaxTreeNode} from "../types.js";
import operatorInit from "./operators/index.js";

let operatorSet: OperatorSet = {};
export const registerOperator = (operatorNodeType: string, operator: Operator) => {
    if (operatorSet[operatorNodeType])
        throw `an operator of type ${operatorNodeType} has already been registered`;

    operatorSet[operatorNodeType] = operator;
};

const evaluate = (node: SyntaxTreeNode, context: Context): SyntaxTreeNode => {
    const operator = operatorSet[node.type];

    if (!operator)
        throw `no operator available for node type "${node.type}"`;

    switch (operator.type) {
        case OperatorType.Generic:
            return operator.evaluator(node, context);

        case OperatorType.Unary:
            const child = evaluate((node as AbstractUnaryOperatorNode).child, context);

            if (operator.overloads[child.type])
                return operator.overloads[child.type](child);

            throw `${node.type}: undefined operation for type "${child.type}"`;

        case OperatorType.Binary:
            const leftChild = evaluate((node as AbstractBinaryOperatorNode).children[0], context);
            const rightChild = evaluate((node as AbstractBinaryOperatorNode).children[1], context);

            if (operator.overloads[leftChild.type]?.[rightChild.type])
                return operator.overloads[leftChild.type][rightChild.type](leftChild, rightChild);

            throw `${node.type}: undefined operation for types "${leftChild.type}", "${rightChild.type}"`;
    }
};

operatorInit();
export default evaluate;