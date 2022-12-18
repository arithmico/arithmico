interface AbstractResult {
    type: string;
}

export interface StringResult extends AbstractResult {
    type: 'string';
    value: string;
}

export interface ErrorResult extends AbstractResult {
    type: 'error';
    message: string;
}

export type EvaluationResult = StringResult | ErrorResult;
