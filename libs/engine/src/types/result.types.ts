import { Context } from './context.types';
import { GraphicNode } from './nodes.types';

interface AbstractResult<T extends string> {
    type: T;
}

export interface StringResult extends AbstractResult<'string'> {
    value: string;
    context: Context;
}

export interface GraphicResult extends AbstractResult<'graphic'> {
    graphic: GraphicNode;
}

export interface ErrorResult extends AbstractResult<'error'> {
    message: string;
}

export type EvaluationResult = StringResult | GraphicResult | ErrorResult;
