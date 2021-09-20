import {Serializer} from "../types.js";
import {And, BinaryOperatorNode, Options, SyntaxTreeNode} from "../../types.js";
import {registerSerializer, serialize} from "../index.js";

const atomics: SyntaxTreeNode["type"][] = ["Number", "Boolean", "Vector", "Symbol"];
const nonRelationNodes: SyntaxTreeNode["type"][] = [...atomics, "Add", "Pow", "FunctionCall", "Not"];

const wrapChildrenWithBrackets = (
    children: SyntaxTreeNode[],
    compatibleWithoutBrackets: SyntaxTreeNode["type"][],
    options: Options
) => children.map((child: SyntaxTreeNode) => compatibleWithoutBrackets.includes(child.type)
    ? serialize(child, options)
    : `(${serialize(child, options)})`
);

const createBinaryBooleanSerializer = <T extends BinaryOperatorNode>(
    nodeType: T["type"],
    compatibleWithoutBrackets: SyntaxTreeNode["type"][],
    operatorSymbol: string
): Serializer<T> => (node, options) => {
    const [leftString, rightString] = wrapChildrenWithBrackets(
        node.children,
        [nodeType, ...compatibleWithoutBrackets],
        options
    );

    return `${leftString} ${operatorSymbol} ${rightString}`;
}

export default () => {
    registerSerializer("And", createBinaryBooleanSerializer(
        "And",
        atomics,
        "&"
    ));

    registerSerializer("Or", createBinaryBooleanSerializer(
        "Or",
        ["And", ...atomics],
        "|"
    ));

    registerSerializer("Equal", createBinaryBooleanSerializer(
        "Equal",
        nonRelationNodes,
        "="
    ));

    registerSerializer("LessThan", createBinaryBooleanSerializer(
        "LessThan",
        nonRelationNodes,
        "<"
    ));

    registerSerializer("GreaterThan", createBinaryBooleanSerializer(
        "GreaterThan",
        nonRelationNodes,
        ">"
    ));

    registerSerializer("LessThanOrEqual", createBinaryBooleanSerializer(
        "LessThanOrEqual",
        nonRelationNodes,
        "<="
    ));

    registerSerializer("GreaterThanOrEqual", createBinaryBooleanSerializer(
        "GreaterThanOrEqual",
        nonRelationNodes,
        ">="
    ));
}