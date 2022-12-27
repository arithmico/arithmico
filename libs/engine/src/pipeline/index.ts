import { Context, EvaluationResult } from '../types';
import { pipe } from '../utils/pipe';
import { evaluateNode } from './stages/evaluate-node';
import { modifyContext } from './stages/modify-context';
import { parseInput } from './stages/parse-input';
import transformResult from './stages/transform-result';

const pipelineWithoutErrorHandling = pipe(parseInput, evaluateNode, modifyContext, transformResult);

export default function evaluationPipeline({ input, context }: { input: string; context: Context }): EvaluationResult {
    try {
        return pipelineWithoutErrorHandling({ input, context });
    } catch (error) {
        return {
            type: 'error',
            error: error,
        };
    }
}
