import { Context, SyntaxTreeNode } from '../../types';
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
import evaluateMethodCall from './nodes/eval-method-call';
import { forEachNode } from '../../utils/for-each-node';

const evaluate = forEachNode<[Context], SyntaxTreeNode>({
    number: evaluateNumber,
    boolean: evaluateBoolean,
    symbol: evaluateSymbol,
    string: evaluateString,
    or: evaluateOr,
    and: evaluateAnd,
    equals: evaluateEquals,
    less: evaluateLess,
    greater: evaluateGreater,
    lessOrEquals: evaluateLessOrEquals,
    greaterOrEquals: evaluateGreaterOrEquals,
    plus: evaluatePlus,
    minus: evaluateMinus,
    times: evaluateTimes,
    divided: evaluateDivided,
    power: evaluatePower,
    negate: evaluateNegate,
    vector: evaluateVector,
    functionCall: evaluateFunctionCall,
    lambda: evaluateLambda,
    function: (node) => node,
    define: evaluateDefine,
    methodCall: evaluateMethodCall,
    graphic: (node) => node,
});

export default evaluate;
