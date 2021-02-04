import { SyntaxTreeNode } from "./types"

const checkNodeType = (node: SyntaxTreeNode, type: string) => node.type === type;

type TypeChecker = (node: SyntaxTreeNode) => Boolean;

export const isSymbol: TypeChecker = node => checkNodeType(node, "Symbol");
export const isBoolean: TypeChecker = node => checkNodeType(node, "Boolean");
export const isNumber: TypeChecker = node => checkNodeType(node, "Number");



