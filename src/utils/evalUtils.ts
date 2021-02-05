import {Context, SyntaxTreeNode} from "../types.js";
import evaluate from "../eval/evaluate.js";

export const evaluateChildren = (children: SyntaxTreeNode[], context: Context) => children.map(
    value => evaluate(value, context)
);



