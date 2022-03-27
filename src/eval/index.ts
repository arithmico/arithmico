import { Context, SyntaxTreeNode } from '../types';
import evaluateAnd from './nodes/And';
import evaluateBoolean from './nodes/Boolean';
import evaluateDefineFunction from './nodes/DefineFunction';
import evaluateDefineLambdaFunction from './nodes/DefineLambdaFunction';
import evaluateDefineVariable from './nodes/DefineVariable';
import evaluateDivided from './nodes/Divided';
import evaluateEquals from './nodes/Equals';
import evaluateFunctionCall from './nodes/FunctionCall';
import evaluateGreater from './nodes/Greater';
import evaluateGreaterOrEquals from './nodes/GreaterOrEquals';
import evaluateLess from './nodes/Less';
import evaluateLessOrEquals from './nodes/LessOrEquals';
import evaluateMinus from './nodes/Minus';
import evaluateNegate from './nodes/Negate';
import evaluateNumber from './nodes/Number';
import evaluateOr from './nodes/Or';
import evaluatePlus from './nodes/Plus';
import evaluatePower from './nodes/Power';
import evaluateSymbol from './nodes/Symbol';
import evaluateTimes from './nodes/Times';
import evaluateVector from './nodes/Vector';

export default function evaluate(node: SyntaxTreeNode, context: Context) {
    switch (node.type) {
        case 'number':
            return evaluateNumber(node);

        case 'boolean':
            return evaluateBoolean(node);

        case 'symbol':
            return evaluateSymbol(node, context);

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

        case 'defineVariable':
            return evaluateDefineVariable(node, context);

        case 'defineFunction':
            return evaluateDefineFunction(node, context);

        case 'defineLambdaFunction':
            return evaluateDefineLambdaFunction(node, context);

        default:
            throw `EvaluationError: unknown node type`;
    }
}
