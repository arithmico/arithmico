import { associativeBinaryNodeTypes, binaryNodeTypes } from '../utils/symbolic-utils';
import { compareFunctionHeaders } from '../utils/parameter-utils';
import {
    NumberNode,
    SyntaxTreeNode,
    BinarySyntaxTreeNode,
    BooleanNode,
    SymbolNode,
    Negate,
    Define,
    FunctionCall,
    FunctionNode,
    Lambda,
    Vector,
} from '../types/nodes.types';

function compareAssociativeBinaryNodes(left: BinarySyntaxTreeNode, right: BinarySyntaxTreeNode): boolean {
    return (
        (equals(left.left, right.left) && equals(left.right, right.right)) ||
        (equals(left.left, right.right) && equals(left.right, right.left))
    );
}

function compareBinaryNodes(left: BinarySyntaxTreeNode, right: BinarySyntaxTreeNode): boolean {
    return equals(left.left, right.left) && equals(left.right, right.right);
}

export default function equals(left: SyntaxTreeNode, right: SyntaxTreeNode): boolean {
    if (left.type !== right.type) {
        return false;
    }

    if ((<string[]>associativeBinaryNodeTypes).includes(left.type)) {
        return compareAssociativeBinaryNodes(<BinarySyntaxTreeNode>left, <BinarySyntaxTreeNode>right);
    } else if ((<string[]>binaryNodeTypes).includes(left.type)) {
        return compareBinaryNodes(<BinarySyntaxTreeNode>left, <BinarySyntaxTreeNode>right);
    }

    switch (left.type) {
        case 'number':
            return left.value === (<NumberNode>right).value;

        case 'boolean':
            return left.value === (<BooleanNode>right).value;

        case 'symbol':
            return left.name === (<SymbolNode>right).name;

        case 'negate':
            return equals(left.value, (<Negate>right).value);

        case 'function':
            return (
                compareFunctionHeaders(left.header, (<FunctionNode>right).header) &&
                equals(left.expression, (<FunctionNode>right).expression)
            );

        case 'functionCall':
            return (
                equals(left.function, (<FunctionCall>right).function) &&
                left.parameters.length === (<FunctionCall>right).parameters.length &&
                left.parameters.every((p, i) => equals(p, (<FunctionCall>right).parameters[i]))
            );

        case 'define':
            return left.name === (<Define>right).name && equals(left.value, (<Define>right).value);

        case 'lambda':
            return (
                compareFunctionHeaders(left.header, (<Lambda>right).header) &&
                equals(left.expression, (<Lambda>right).expression)
            );

        case 'vector':
            return (
                left.values.length === (<Vector>right).values.length &&
                left.values.every((v, i) => equals(v, (<Vector>right).values[i]))
            );
    }

    throw `ComparisonError: unknown node tpye ${left.type}`;
}
