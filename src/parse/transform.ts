import { createAdd, createAnd, createBoolean, createDefinition, createEqual, createFunctionCall, createGreaterThan, createGreaterThanOrEqual, createLessThan, createLessThanOrEqual, createMul, createNot, createNumber, createOr, createPow, createSymbol, createVector } from "../create/create.js";
import { SyntaxTreeNode } from "../types.js";

export const transform = (node: any): SyntaxTreeNode => {
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
                node.parameters.map(transform)
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

        case "Power":
            return {
                type: "Pow",
                children: [
                    transform(node.items[0]),
                    transform(node.items[1])
                ]
            };

        case "Relation":
            return transformRelation(
                node.values as any[],
                node.operators as string[]
            );

        default:
            throw `unkown node type "${node.type}"`;
    }
}

const transformSum = (items: any[]): SyntaxTreeNode => {
    const transformedItems = items.map(
        item => item.operator === "+"
            ? transform(item.value)
            : createMul(createNumber(-1), transform(item.value))
    );

    if (transformedItems.length === 1) 
        return transformedItems[0];

    return transformedItems.reduce(
        (acc, val) => createAdd(acc, val)
    );
}

const transformProduct = (items: any[]): SyntaxTreeNode => {
    const transformedItems = items.map(
        item => item.operator === "*"
            ? transform(item.value)
            : createPow(transform(item.value), createNumber(-1))
    );

    if (transformedItems.length === 1) 
        return transformedItems[0];

    return transformedItems.reduce(
        (acc, val) => createMul(acc, val)
    );
}

const transformRelation = (items: any[], operators: string[]) => {
    if (items.length - 1 !== operators.length)
        throw "invalid operator count";
    
    const components: SyntaxTreeNode[] = [];
    for (let i = 1; i < items.length; i++) {
        let component: SyntaxTreeNode;
        switch (operators[i - 1]) {
            case "Equal":
                component = createEqual(
                    transform(items[i - 1]),
                    transform(items[i])
                );
                break;

            case "GreaterThan":
                component = createGreaterThan(
                    transform(items[i - 1]),
                    transform(items[i])
                );
                break;

            case "GreaterThanOrEqual":
                component = createGreaterThanOrEqual(
                    transform(items[i - 1]),
                    transform(items[i])
                );
                break;

            case "LessThan":
                component = createLessThan(
                    transform(items[i - 1]),
                    transform(items[i])
                );
                break;

            case "LessThanOrEqual":
                component = createLessThanOrEqual(
                    transform(items[i - 1]),
                    transform(items[i])
                );
                break;

            default:
                throw `unknown relation type "${operators[i - 1]}"`;
        }
        components.push(component);
    }

    return components.reduce(
        (acc, val) => createAnd(acc, val)
    );
}