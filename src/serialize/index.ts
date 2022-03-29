import { SyntaxTreeNode, Options } from '../types';
import serializeAnd from './nodes/And';
import serializeDivided from './nodes/Divided';
import serializeEquals from './nodes/Equals';
import serializeFunction from './nodes/Function';
import serializeFunctionCall from './nodes/FunctionCall';
import serializeGreater from './nodes/Greater';
import serializeGreaterOrEquals from './nodes/GreaterOrEquals';
import serializeLess from './nodes/Less';
import serializeLessOrEquals from './nodes/LessOrEqual';
import serializeMinus from './nodes/Minus';
import serializeNegate from './nodes/Negate';
import serializeNumber from './nodes/Number';
import serializeOr from './nodes/Or';
import serializePlus from './nodes/Plus';
import serializePower from './nodes/Power';
import serializeTimes from './nodes/Times';
import serializeVector from './nodes/Vector';

const serializePrecedents: SyntaxTreeNode['type'][] = [
    'define',
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
            return serializeFunction(node);

        case 'define':
            return serialize(node.value, options);

        default:
            throw 'SerializationError: Unknown node type';
    }
}
