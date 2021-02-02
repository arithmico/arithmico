import { createBoolean, createNumber, createSymbol } from "./create.js"

const compareNodes = (node1: any, node2: any) => expect(node1).toStrictEqual(node2);

describe("create-primitive", () => {
    test("create-number", () => {
        compareNodes(createNumber(1.2), {
            type: "Number",
            value: 1.2
        });
    });
    
    test("create-boolean", () => {
        compareNodes(createSymbol("x"), {
            type: "Symbol",
            name: "x"
        });
    });

    test("create-boolean", () => {
        compareNodes(createBoolean(true), {
            type: "Boolean",
            value: true
        });
    });
});
