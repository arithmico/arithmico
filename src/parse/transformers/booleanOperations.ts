import {transform, addTransformer} from "../transform.js";
import {
    createAnd,
    createEqual,
    createGreaterThan,
    createGreaterThanOrEqual,
    createLessThan, createLessThanOrEqual, createNot,
    createOr
} from "../../create/create.js";
import {SyntaxTreeNode} from "../../types.js";

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

export default () => {
    addTransformer("And", (node) => createAnd(
        transform(node.items[0]),
        transform(node.items[1])
    ));

    addTransformer("Or", (node) => createOr(
        transform(node.items[0]),
        transform(node.items[1])
    ));

    addTransformer("Relation", (node) => transformRelation(
        node.values as any[],
        node.operators as string[]
    ));

    addTransformer("Not", (node) => createNot(node.value));
}