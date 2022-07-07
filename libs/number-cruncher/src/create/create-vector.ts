import { SyntaxTreeNode, Vector } from '../types';

export default function createVector(values: SyntaxTreeNode[]): Vector {
    return {
        type: 'vector',
        values,
    };
}
