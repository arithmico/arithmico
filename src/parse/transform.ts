import { SyntaxTreeNode } from "../types.js";
import transformersInit from "./transformers/index.js";

type Transformer = (node: any) => SyntaxTreeNode;
type TransformerSet = {
    [key: string]: Transformer
};

const transformers: TransformerSet = {};
export const addTransformer = (nodeType: string, transformer: Transformer) => {
    if (transformers[nodeType])
        throw `a transformer for "${nodeType}" already exists`;

    transformers[nodeType] = transformer;
};
transformersInit();

export const transform = (node: any): SyntaxTreeNode => {
    if (typeof node !== "object")
        throw `expected object got ${typeof node}`;

    if (!node.type)
        throw `node has no type property`;

    if (!transformers[node.type])
        throw `no transformer available for type "${node.type}"`;

    return transformers[node.type](node);
};