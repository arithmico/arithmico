import { Context, SyntaxTreeNode } from '../types';
import evaluateAnd from './nodes/eval-and';
import evaluateBoolean from './nodes/eval-boolean';
import evaluateLambda from './nodes/eval-lambda';
import evaluateDivided from './nodes/eval-divided';
import evaluateEquals from './nodes/eval-equals';
import evaluateFunctionCall from './nodes/eval-function-call';
import evaluateGreater from './nodes/eval-greater';
import evaluateGreaterOrEquals from './nodes/eval-greater-or-equals';
import evaluateLess from './nodes/eval-less';
import evaluateLessOrEquals from './nodes/eval-less-or-equals';
import evaluateMinus from './nodes/eval-minus';
import evaluateNegate from './nodes/eval-negate';
import evaluateNumber from './nodes/eval-number';
import evaluateOr from './nodes/eval-or';
import evaluatePlus from './nodes/eval-plus';
import evaluatePower from './nodes/eval-power';
import evaluateSymbol from './nodes/eval-symbol';
import evaluateTimes from './nodes/eval-times';
import evaluateVector from './nodes/eval-vector';
import evaluateDefine from './nodes/eval-define';
import evaluateString from './nodes/eval-string';

export default function evaluate(node: SyntaxTreeNode, context: Context) {
    switch (node.type) {
        case 'number':
            return evaluateNumber(node);

        case 'boolean':
            return evaluateBoolean(node);

        case 'symbol':
            return evaluateSymbol(node, context);

        case 'string':
            return evaluateString(node);

        case 'or':
            return evaluateOr(node, context);

        case 'and':
            return evaluateAnd(node, context);

        case 'equals':
            return evaluateEquals(node, context);

        case 'less':
            return evaluateLess(node, context);

        case 'greater':
            return evaluateGreater(node, context);

        case 'lessOrEquals':
            return evaluateLessOrEquals(node, context);

        case 'greaterOrEquals':
            return evaluateGreaterOrEquals(node, context);

        case 'plus':
            return evaluatePlus(node, context);

        case 'minus':
            return evaluateMinus(node, context);

        case 'times':
            return evaluateTimes(node, context);

        case 'divided':
            return evaluateDivided(node, context);

        case 'power':
            return evaluatePower(node, context);

        case 'negate':
            return evaluateNegate(node, context);

        case 'vector':
            return evaluateVector(node, context);

        case 'functionCall':
            return evaluateFunctionCall(node, context);

        case 'lambda':
            return evaluateLambda(node, context);

        case 'function':
            return node;

        case 'define':
            return evaluateDefine(node, context);

        default:
            throw `EvaluationError: unknown node type`;
    }
}
