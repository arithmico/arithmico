import {Serializer, SerializerSet} from "./types.js";
import {Context, SyntaxTreeNode} from "../types.js";

let serializerSet: SerializerSet = {};

export const registerSerializer = (target: SyntaxTreeNode["type"], serializer: Serializer) => {
    serializerSet[target] = serializer;
};

export const serialize = (node: SyntaxTreeNode, options: Context["options"]): string => {
    if (!serializerSet[node.type])
        throw `no serializer available for type "${node.type}"`;

    return serializerSet[node.type](node, options);
};