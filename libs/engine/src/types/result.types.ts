import { Context } from './context.types';
import { GraphicNode } from './graphics.types';

interface AbstractResult<T extends string> {
    type: T;
    context: Context;
}

export interface TextResult extends AbstractResult<'text'> {
    text: string;
}

export interface GraphicResult extends AbstractResult<'graphic'> {
    graphic: GraphicNode;
}

export interface ErrorResult extends AbstractResult<'error'> {
    error: string;
}

export type EvaluationResult = TextResult | GraphicResult | ErrorResult;
