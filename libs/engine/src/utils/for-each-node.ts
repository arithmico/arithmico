import { SyntaxTreeNode } from '../types';
import { createLookupTableFunction, LookupTable, LookupTableFunction } from './lookup-table-function';

export function forEachNode<Args extends unknown[], ResultType>(
    lookupTable: LookupTable<SyntaxTreeNode['type'], LookupTableFunction<[SyntaxTreeNode, ...Args], ResultType>>,
): (node: SyntaxTreeNode, ...args: Args) => ResultType {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return createLookupTableFunction(lookupTable, (node, ..._args) => node.type);
}
