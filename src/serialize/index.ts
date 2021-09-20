import {Serializer, SerializerSet} from "./types.js";
import {Context, SyntaxTreeNode} from "../types.js";
import initSerializers from "./serializers/index.js"

const serializerSet: SerializerSet = {};

export const registerSerializer = <T extends SyntaxTreeNode>(target: T["type"], serializer: Serializer<T>) => {
    // @ts-ignore
    serializerSet[target] = serializer;
};

export const serialize = (node: SyntaxTreeNode, options: Context["options"]): string => {
    if (!serializerSet[node.type])
        throw `no serializer available for type "${node.type}"`;

    // @ts-ignore
    return serializerSet[node.type](node, options);
};

initSerializers();