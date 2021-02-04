import { SyntaxTreeNode } from "../types.js";
import evaluate from "./evaluate.js";

export const evaluateChildren = (children: SyntaxTreeNode[]) => children.map(evaluate);



