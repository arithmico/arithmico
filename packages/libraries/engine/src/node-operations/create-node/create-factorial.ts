import { Factorial, SyntaxTreeNode } from '../../types';

export default function createFactorial(value: SyntaxTreeNode): Factorial {
    return {
        type: 'factorial',
        value: value,
    };
}
