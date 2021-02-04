import { createAnd, createBoolean, createDefinition, createEqual, createFunctionCall, createGreaterThan, createGreaterThanOrEqual, createLessThanOrEqual, createMul, createNot, createNumber, createOr, createSymbol, createVector } from "../create/create.js";
import { Add, Sub, SyntaxTreeNode } from "../types.js";

const transform = (node: any): SyntaxTreeNode => {
    if (typeof node !== "object")
        throw `expected object got ${typeof node}`;

    switch (node.type) {
        case "Number": 
            return createNumber(node.value as number);

        case "Boolean":
            return createBoolean(node.value as boolean);

        case "Symbol":
            return createSymbol(node.name as string);

        case "Vector":
            return createVector(node.items.map(transform));
            
        case "FunctionCall":
            return createFunctionCall(
                node.name, 
                node.items.map(transform)
            );

        case "Definition":
            return createDefinition(
                transform(node.target),
                transform(node.value)
            );

        case "Not":
            return createNot(transform(node.value));

        case "And":
            return createAnd(
                transform(node.items[0]),
                transform(node.items[1])
            );

        case "Or":
            return createOr(
                transform(node.items[0]),
                transform(node.items[1])
            );

        case "Equal":
            return createEqual(
                transform(node.items[0]),
                transform(node.items[1])
            );

        case "LessThan":
            return createLessThanOrEqual(
                transform(node.items[0]),
                transform(node.items[1])
            );

        case "LessThanOrEqual":
            return createLessThanOrEqual(
                transform(node.items[0]),
                transform(node.items[1])
            );

        case "GreaterThan":
            return createGreaterThan(
                transform(node.items[0]),
                transform(node.items[1])
            );

        case "GreaterThanOrEqual":
            return createGreaterThanOrEqual(
                transform(node.items[0]),
                transform(node.items[1])
            );

        case "Sum":
            const transformedSum = transformSum(node.items);
            if (node.items[0].operator === "-") {
                return createMul(
                    createNumber(-1),
                    transformedSum
                );
            }
            return transformedSum;

        case "Product":
            return transformProduct(node.items);

        default:
            throw `unkown node type "${node.type}"`;
    }
}

const transformSum = (items: any[]): SyntaxTreeNode => {
    if (items.length < 1)
        throw "invalid parameter expected non empty items array";

    const last = transform(items[items.length - 1].value);
    if (items.length === 1)
        return last;

    const operator = items[items.length - 2].operator;
    const previousItems = items.slice(items.length - 1);

    return {
        type: operator === "-" ? "Sub" : "Add",
        children: [
            transformSum(previousItems),
            last
        ]
    };
};

const transformProduct = (items: any[]): SyntaxTreeNode => {
    if (items.length < 1)
        throw "invalid parameter expected non empty items array";

    const last = transform(items[items.length - 1].value);
    if (items.length === 1)
        return last;

    const operator = items[items.length - 2].operator;
    const previousItems = items.slice(items.length - 1);

    return {
        type: operator === "/" ? "Div" : "Mul",
        children: [
            transformSum(previousItems),
            last
        ]
    };
}