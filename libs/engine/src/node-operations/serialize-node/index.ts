import { Options, SyntaxTreeNode } from '../../types';
import { forEachNode } from '../../utils/for-each-node';
import serializeAnd from './nodes/serialize-and';
import serializeBoolean from './nodes/serialize-boolean';
import serializeDefine from './nodes/serialize-define';
import serializeDivided from './nodes/serialize-divided';
import serializeEquals from './nodes/serialize-equals';
import serializeFunction from './nodes/serialize-function';
import serializeFunctionCall from './nodes/serialize-function-call';
import serializeGreater from './nodes/serialize-greater';
import serializeGreaterOrEquals from './nodes/serialize-greater-or-equals';
import serializeLambda from './nodes/serialize-lambda';
import serializeLess from './nodes/serialize-less';
import serializeLessOrEquals from './nodes/serialize-less-or-equal';
import serializeMethodCall from './nodes/serialize-method-call';
import serializeMinus from './nodes/serialize-minus';
import serializeNegate from './nodes/serialize-negate';
import serializeNumber from './nodes/serialize-number';
import serializeOr from './nodes/serialize-or';
import serializePlus from './nodes/serialize-plus';
import serializePower from './nodes/serialize-power';
import serializeStringNode from './nodes/serialize-string-node';
import serializeSymbol from './nodes/serialize-symbol';
import serializeTimes from './nodes/serialize-times';
import serializeVector from './nodes/serialize-vector';

const serializePrecedents: SyntaxTreeNode['type'][] = [
    'define',
    'function',
    'lambda',
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
    'methodCall',
    'vector',
    'symbol',
    'boolean',
    'number',
    'string',
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

const serialize: (node: SyntaxTreeNode, options: Options) => string = forEachNode<[Options], string>({
    number: serializeNumber,
    boolean: serializeBoolean,
    symbol: serializeSymbol,
    string: serializeStringNode,
    or: serializeOr,
    and: serializeAnd,
    equals: serializeEquals,
    less: serializeLess,
    greater: serializeGreater,
    lessOrEquals: serializeLessOrEquals,
    greaterOrEquals: serializeGreaterOrEquals,
    plus: serializePlus,
    minus: serializeMinus,
    times: serializeTimes,
    divided: serializeDivided,
    power: serializePower,
    negate: serializeNegate,
    vector: serializeVector,
    functionCall: serializeFunctionCall,
    lambda: serializeLambda,
    function: serializeFunction,
    define: serializeDefine,
    methodCall: serializeMethodCall,
});

export default serialize;
