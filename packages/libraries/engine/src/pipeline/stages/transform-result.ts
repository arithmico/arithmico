import serialize from '../../node-operations/serialize-node';
import { Context, EvaluationResult, GraphicNode, SyntaxTreeNode } from '../../types';
import { createLookupTableFunction, LookupTableFunction } from '../../utils/lookup-table-function';

function createTextResult(node: SyntaxTreeNode, context: Context): EvaluationResult {
    return {
        type: 'text',
        text: serialize(node, context.options),
        context,
    };
}

function createGraphicResult(node: SyntaxTreeNode, context: Context): EvaluationResult {
    return {
        type: 'graphic',
        graphic: node as GraphicNode,
        context,
    };
}

const transformResultLookupFunction = createLookupTableFunction<
    SyntaxTreeNode['type'],
    LookupTableFunction<[SyntaxTreeNode, Context], EvaluationResult>
>(
    {
        number: createTextResult,
        boolean: createTextResult,
        symbol: createTextResult,
        string: createTextResult,
        or: createTextResult,
        and: createTextResult,
        equals: createTextResult,
        less: createTextResult,
        greater: createTextResult,
        lessOrEquals: createTextResult,
        greaterOrEquals: createTextResult,
        plus: createTextResult,
        minus: createTextResult,
        times: createTextResult,
        divided: createTextResult,
        power: createTextResult,
        negate: createTextResult,
        vector: createTextResult,
        functionCall: createTextResult,
        lambda: createTextResult,
        function: createTextResult,
        define: createTextResult,
        methodCall: createTextResult,
        graphic: createGraphicResult,
    },
    (node) => node.type,
);

export default function transformResult({ node, context }: { node: SyntaxTreeNode; context: Context }) {
    return transformResultLookupFunction(node, context);
}
