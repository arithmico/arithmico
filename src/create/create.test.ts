import { createAdd, createAnd, createBoolean, createDefinition, createDiv, createEqual, createFunctionCall, createGreaterThan, createGreaterThanOrEqual, createLessThan, createLessThanOrEqual, createMul, createNot, createNumber, createOr, createPow, createSub, createSymbol, createVector } from "./create.js"

const compareNodes = (node1: any, node2: any) => {
    return () => expect(node1).toStrictEqual(node2);
};

describe("create-primitive", () => {
    test("create-number", compareNodes(
        createNumber(1.2), {
            type: "Number",
            value: 1.2
        }
    ));
    
    test("create-boolean", compareNodes(
        createSymbol("x"), {
            type: "Symbol",
            name: "x"
        }
    ));

    test("create-boolean", compareNodes(
        createBoolean(true), {
            type: "Boolean",
            value: true
        }
    ));
});

describe("create-numeric-operation", () => {
    const childA = createNumber(1.2);
    const childB = createSymbol("x");

    test("create-add", compareNodes(
        createAdd(childA, childB), {
            type: "Add", 
            children: [childA, childB]
        }
    ));

    test("create-sub", compareNodes(
        createSub(childA, childB), {
            type: "Sub", 
            children: [childA, childB]
        }
    ));

    test("create-mul", compareNodes(
        createMul(childA, childB), {
            type: "Mul", 
            children: [childA, childB]
        }
    ));

    test("create-div", compareNodes(
        createDiv(childA, childB), {
            type: "Div", 
            children: [childA, childB]
        }
    ));

    test("create-pow", compareNodes(
        createPow(childA, childB), {
            type: "Pow", 
            children: [childA, childB]
        }
    ));
});

describe("create-boolean-operation", () => {
    const childA = createBoolean(false);
    const childB = createSymbol("y");

    test("create-and", compareNodes(
        createAnd(childA, childB), {
            type: "And",
            children: [childA, childB]
        }
    ));

    test("create-or", compareNodes(
        createOr(childA, childB), {
            type: "Or",
            children: [childA, childB]
        }
    ));

    test("create-equal", compareNodes(
        createEqual(childA, childB), {
            type: "Equal",
            children: [childA, childB]
        }
    ));

    test("create-less-than", compareNodes(
        createLessThan(childA, childB), {
            type: "LessThan",
            children: [childA, childB]
        }
    ));

    test("create-greater-than", compareNodes(
        createGreaterThan(childA, childB), {
            type: "GreaterThan",
            children: [childA, childB]
        }
    ));

    test("create-less-than-or-equal", compareNodes(
        createLessThanOrEqual(childA, childB), {
            type: "LessThanOrEqual",
            children: [childA, childB]
        }
    ));

    test("create-greater-than-or-equal", compareNodes(
        createGreaterThanOrEqual(childA, childB), {
            type: "GreaterThanOrEqual",
            children: [childA, childB]
        }
    ));

    test("create-not", compareNodes(
        createNot(childA), {
            type: "Not",
            child: childA
        }
    ));
});

describe("create-misc", () => {
    const childA = createSymbol("fooBar");
    const childB = createNumber(-2);

    test("create-vector", compareNodes(
        createVector([childA, childB]), {
            type: "Vector",
            children: [childA, childB]
        }
    ));

    test("create-definition", compareNodes(
        createDefinition(childA, childB), {
            type: "Definition",
            children: [childA, childB]
        }
    ));

    test("create-function-call", compareNodes(
        createFunctionCall("f", [childA, childB]), {
            type: "FunctionCall",
            name: "f",
            children: [childA, childB]
        }
    ));
})