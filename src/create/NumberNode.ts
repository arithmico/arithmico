import { NumberNode } from './../types';

export default function createNumberNode(value: number): NumberNode {
    return {
        type: 'number',
        value,
    };
}
