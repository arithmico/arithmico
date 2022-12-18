import { NumberNode } from '../types';

export default function createNumberNode(value: number): NumberNode {
    if (!Number.isFinite(value)) {
        throw 'RuntimeError: undefined';
    }

    return {
        type: 'number',
        value,
    };
}
