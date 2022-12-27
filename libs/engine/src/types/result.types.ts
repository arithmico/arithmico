import { Context } from './context.types';
import { GraphicNode } from './graphics.types';

interface AbstractResult<T extends string> {
    type: T;
}

export interface TextResult extends AbstractResult<'text'> {
    text: string;
    context: Context;
}

export interface GraphicResult extends AbstractResult<'graphic'> {
    graphic: GraphicNode;
}

export interface ErrorResult extends AbstractResult<'error'> {
    error: string;
}

export type EvaluationResult = TextResult | GraphicResult | ErrorResult;
