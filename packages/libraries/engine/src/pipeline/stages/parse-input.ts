import { parse } from 'parser';
import { Context, SyntaxTreeNode } from '../../types';

export function parseInput({ input, context }: { input: string; context: Context }) {
    try {
        const node = parse(input, {
            language: context.options.decimalSeparator === ',' ? 'de' : 'en',
        }) as SyntaxTreeNode;

        return {
            node,
            context,
        };
    } catch (parseError) {
        throw `SyntaxError: ${parseError.message}`;
    }
}
