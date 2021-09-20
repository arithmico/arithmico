import {Context, SyntaxTreeNode, SyntaxTreeNodeOfType} from "../types.js";

export type SerializerSet = {
    [Type in SyntaxTreeNode["type"]]?: Serializer<SyntaxTreeNodeOfType<Type>>;
}

export type Serializer<T extends SyntaxTreeNode> = (node: T, options: Context["options"]) => string;