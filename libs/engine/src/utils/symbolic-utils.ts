import { BinarySyntaxTreeNode, SymbolNode } from '../types/SyntaxTreeNodes';
import { Context, SyntaxTreeNode } from '../types';
import createNegate from '../create-node/create-negate';
import createVector from '../create-node/create-vector';
import createSymbolNode from '../create-node/create-symbol-node';
import { existsOnStack } from './context-utils';

export const binaryNodeTypes: BinarySyntaxTreeNode['type'][] = [
    'and',
    'or',
    'greater',
    'less',
    'greaterOrEquals',
    'lessOrEquals',
    'equals',
    'plus',
    'minus',
    'times',
    'divided',
    'power',
];

export const associativeBinaryNodeTypes: BinarySyntaxTreeNode['type'][] = ['and', 'or', 'equals', 'plus', 'times'];

type Matcher = (node: SyntaxTreeNode) => boolean;
type Replacer = (node: SyntaxTreeNode) => SyntaxTreeNode;

export function find(node: SyntaxTreeNode, matcher: Matcher): SyntaxTreeNode[] {
    const results: SyntaxTreeNode[] = [];

    if (matcher(node)) {
        results.push(node);
    }

    if (binaryNodeTypes.includes((<BinarySyntaxTreeNode>node).type)) {
        find((<BinarySyntaxTreeNode>node).left, matcher).forEach((item) => results.push(item));
        find((<BinarySyntaxTreeNode>node).right, matcher).forEach((item) => results.push(item));
    }

    if (node.type === 'negate') {
        find(node.value, matcher).forEach((item) => results.push(item));
    }

    if (node.type === 'vector') {
        node.values.forEach((value) => find(value, matcher).forEach((item) => results.push(item)));
    }

    if (node.type === 'functionCall') {
        find(node.function, matcher).forEach((item) => results.push(item));
        node.parameters.forEach((parameter) => find(parameter, matcher).forEach((item) => results.push(item)));
    }

    return results;
}

export function replace(node: SyntaxTreeNode, matcher: Matcher, replacer: Replacer): SyntaxTreeNode {
    let currentNode: SyntaxTreeNode = node;

    if (binaryNodeTypes.includes((<BinarySyntaxTreeNode>currentNode).type)) {
        const left = replace((<BinarySyntaxTreeNode>currentNode).left, matcher, replacer);
        const right = replace((<BinarySyntaxTreeNode>currentNode).right, matcher, replacer);
        currentNode = <BinarySyntaxTreeNode>{ ...currentNode, left, right };
    }

    if (currentNode.type === 'negate') {
        currentNode = createNegate(replace(currentNode.value, matcher, replacer));
    }

    if (currentNode.type === 'vector') {
        currentNode = createVector(currentNode.values.map((child) => replace(child, matcher, replacer)));
    }

    if (matcher(currentNode)) {
        return replacer(currentNode);
    }

    return currentNode;
}

export function getSymbolNames(node: SyntaxTreeNode): Set<string> {
    const result = new Set<string>();
    const symbols = <SymbolNode[]>find(node, (node) => node.type === 'symbol');
    symbols.forEach((symbol) => result.add(symbol.name));
    return result;
}

export function getVariableNames(node: SyntaxTreeNode, context: Context): string[] {
    const symbols = getSymbolNames(node);
    return [...symbols.values()].filter((symbol) => !existsOnStack(symbol, context));
}

export function containsSymbols(node: SyntaxTreeNode): boolean {
    return getSymbolNames(node).size > 0;
}

export function containsVariables(node: SyntaxTreeNode, context: Context): boolean {
    return getVariableNames(node, context).length > 0;
}

export function resolveNameConflicts(node: SyntaxTreeNode, name: string): SyntaxTreeNode {
    const newName = name + "'";
    const matcher: Matcher = (node: SyntaxTreeNode) => node.type === 'symbol' && node.name === name;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const replacer: Replacer = (_node: SyntaxTreeNode) => createSymbolNode(newName);

    if (find(node, matcher).length > 0) {
        const conflictFreeNode = resolveNameConflicts(node, newName);
        return replace(conflictFreeNode, matcher, replacer);
    }

    return node;
}

export function convertOperatorChainToList(type: BinarySyntaxTreeNode['type'], node: SyntaxTreeNode): SyntaxTreeNode[] {
    if (node.type !== type) {
        return [node];
    }

    return [node.left, ...convertOperatorChainToList(type, node.right)];
}

export function convertListToOperatorChain(
    type: BinarySyntaxTreeNode['type'],
    nodes: SyntaxTreeNode[],
): SyntaxTreeNode {
    if (nodes.length === 0) {
        throw 'ConversionError: empty list';
    }

    if (nodes.length === 1) {
        return nodes[0];
    }

    const nodesToBeJoined = nodes.slice(0, nodes.length - 2);
    const startValue: BinarySyntaxTreeNode = { type, left: nodes[nodes.length - 2], right: nodes[nodes.length - 1] };

    return nodesToBeJoined.reduceRight(
        (right, left) => ({
            type,
            left,
            right,
        }),
        startValue,
    );
}
