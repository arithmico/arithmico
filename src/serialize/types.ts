import {Context, SyntaxTreeNode} from "../types.js";

export type SerializerSet = {
    [key in SyntaxTreeNode["type"]]?: Serializer;
};

export type Serializer = (node: SyntaxTreeNode, options: Context["options"]) => string;