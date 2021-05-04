import {transform, addTransformer} from "../transform.js";
import {createDefinition, createFunctionCall, createFunctionSignature, createVector} from "../../create/create.js";

export default () => {
    addTransformer("FunctionCall", (node) => createFunctionCall(
        node.name,
        node.parameters.map(transform)
    ));

    addTransformer("FunctionSignature", (node) => createFunctionSignature(
        node.name,
        node.parameters
    ));

    addTransformer("Definition", (node) => createDefinition(
        transform(node.target),
        transform(node.value)
    ));

    addTransformer("Vector", (node) => createVector(node.items.map(transform)));
};