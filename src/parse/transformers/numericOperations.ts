import {transform, addTransformer} from "../transform.js";
import {createAdd, createMul, createNumber, createPow} from "../../create/create.js";
import {SyntaxTreeNode} from "../../types.js";

export default () => {
    addTransformer("Power", (node) => createPow(
        transform(node.items[0]),
        transform(node.items[1])
    ));

    addTransformer("Sum", (node) => transformSum(node.items));
    addTransformer("Product", (node) => transformProduct(node.items));
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
