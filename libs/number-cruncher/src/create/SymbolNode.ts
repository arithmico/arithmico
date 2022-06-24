import { SymbolNode } from '../types';

export default function createSymbolNode(name: string): SymbolNode {
    return {
        type: 'symbol',
        name,
    };
}
