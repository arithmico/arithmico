import { SyntaxTreeNode, Options } from '../types';
import serializeAnd from './nodes/serialize-and';
import serializeDivided from './nodes/serialize-divided';
import serializeEquals from './nodes/serialize-equals';
import serializeFunction from './nodes/serialize-function';
import serializeFunctionCall from './nodes/serialize-function-call';
import serializeGreater from './nodes/serialize-greater';
import serializeGreaterOrEquals from './nodes/serialize-greater-or-equals';
import serializeLess from './nodes/serialize-less';
import serializeLessOrEquals from './nodes/serialize-less-or-equal';
import serializeMinus from './nodes/serialize-minus';
import serializeNegate from './nodes/serialize-negate';
import serializeNumber from './nodes/serialize-number';
import serializeOr from './nodes/serialize-or';
import serializePlus from './nodes/serialize-plus';
import serializePower from './nodes/serialize-power';
import serializeTimes from './nodes/serialize-times';
import serializeVector from './nodes/serialize-vector';

const serializePrecedents: SyntaxTreeNode['type'][] = [
    'define',
    'function',
    'or',
    'and',
    'equals',
    'less',
    'greater',
    'lessOrEquals',
    'greaterOrEquals',
    'plus',
    'minus',
    'negate',
    'times',
    'divided',
    'power',
    'functionCall',
    'vector',
    'symbol',
    'boolean',
    'number',
];

export function needsBrackets(
    parentType: SyntaxTreeNode['type'],
    childType: SyntaxTreeNode['type'],
    bracketsOnEqualPrecedence = false,
): boolean {
    return bracketsOnEqualPrecedence
        ? serializePrecedents.indexOf(childType) <= serializePrecedents.indexOf(parentType)
        : serializePrecedents.indexOf(childType) < serializePrecedents.indexOf(parentType);
}

export default function serialize(node: SyntaxTreeNode, options: Options): string {
    switch (node.type) {
        case 'or':
            return serializeOr(node, options);

        case 'and':
            return serializeAnd(node, options);

        case 'equals':
            return serializeEquals(node, options);

        case 'less':
            return serializeLess(node, options);

        case 'greater':
            return serializeGreater(node, options);

        case 'lessOrEquals':
            return serializeLessOrEquals(node, options);

        case 'greaterOrEquals':
            return serializeGreaterOrEquals(node, options);

        case 'plus':
            return serializePlus(node, options);

        case 'minus':
            return serializeMinus(node, options);

        case 'negate':
            return serializeNegate(node, options);

        case 'times':
            return serializeTimes(node, options);

        case 'divided':
            return serializeDivided(node, options);

        case 'power':
            return serializePower(node, options);

        case 'functionCall':
            return serializeFunctionCall(node, options);

        case 'vector':
            return serializeVector(node, options);

        case 'number':
            return serializeNumber(node, options);

        case 'boolean':
            return node.value ? 'true' : 'false';

        case 'symbol':
            return node.name;

        case 'function':
            return serializeFunction(node, options);

        case 'define':
            return serialize(node.value, options);

        default:
            throw `SerializationError: Unknown node type ${node.type}`;
    }
}
