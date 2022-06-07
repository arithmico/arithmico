import { SyntaxTreeNode } from './SyntaxTreeNodes';

export interface Options {
    decimalPlaces: number;
    decimalSeparator: '.' | ',';
    magnitudeThresholdForScientificNotation: number;
    angleUnit: 'degrees' | 'radians';
    config: {
        loadWhitelist: string[];
        operators: {
            define: boolean;
            lambda: boolean;

            orBooleanBoolean: boolean;
            orFunctionFunction: boolean;

            andBooleanBoolean: boolean;
            andFunctionFunction: boolean;

            negateNumber: boolean;
            negateBoolean: boolean;
            negateFunction: boolean;

            equalsNumberNumber: boolean;
            equalsBooleanBoolean: boolean;
            equalsFunctionFunction: boolean;

            lessNumberNumber: boolean;
            lessFunctionFunction: boolean;

            lessOrEqualsNumberNumber: boolean;
            lessOrEqualsFunctionFunction: boolean;

            greaterNumberNumber: boolean;
            greaterFunctionFunction: boolean;

            greaterOrEqualsNumberNumber: boolean;
            greaterOrEqualsFunctionFunction: boolean;

            plusNumberNumber: boolean;
            plusVectorVector: boolean;
            plusFunctionFunction: boolean;

            minusNumberNumber: boolean;
            minusVectorVector: boolean;
            minusFunctionFunction: boolean;

            timesNumberNumber: boolean;
            timesNumberVector: boolean;
            timesVectorVector: boolean;
            timesVectorMatrix: boolean;
            timesMatrixMatrix: boolean;
            timesFunctionFunction: boolean;

            dividedNumberNumber: boolean;
            dividedVectorNumber: boolean;
            dividedFunctionFunction: boolean;

            powerNumberNumber: boolean;
            powerFunctionFunction: boolean;
        };
    };
}
export interface StackFrame {
    [key: string]: SyntaxTreeNode;
}

export interface Context {
    options: Options;
    stack: StackFrame[];
}
