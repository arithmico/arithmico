import serialize from '../../node-operations/serialize-node';
import { Context, EvaluationResult, SyntaxTreeNode } from '../../types';
import { createLookupTableFunction, LookupTableFunction } from '../../utils/lookup-table-function';

function createStringResult(node: SyntaxTreeNode, context: Context): EvaluationResult {
    return {
        type: 'string',
        value: serialize(node, context.options),
        context,
    };
}

const transformResultLookupFunction = createLookupTableFunction<
    SyntaxTreeNode['type'],
    LookupTableFunction<[SyntaxTreeNode, Context], EvaluationResult>
>(
    {
        number: createStringResult,
        boolean: createStringResult,
        symbol: createStringResult,
        string: createStringResult,
        or: createStringResult,
        and: createStringResult,
        equals: createStringResult,
        less: createStringResult,
        greater: createStringResult,
        lessOrEquals: createStringResult,
        greaterOrEquals: createStringResult,
        plus: createStringResult,
        minus: createStringResult,
        times: createStringResult,
        divided: createStringResult,
        power: createStringResult,
        negate: createStringResult,
        vector: createStringResult,
        functionCall: createStringResult,
        lambda: createStringResult,
        function: createStringResult,
        define: createStringResult,
        methodCall: createStringResult,
    },
    (node) => node.type,
);

export default function transformResult({ node, context }: { node: SyntaxTreeNode; context: Context }) {
    return transformResultLookupFunction(node, context);
}
