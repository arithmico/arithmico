import { createAdd, createAnd, createBoolean, createDefinition, createFunctionCall, createFunctionSignature, createGreaterThan, createGreaterThanOrEqual, createLessThan, createLessThanOrEqual, createMul, createNot, createNumber, createOr, createPow, createSymbol, createVector } from "../create/create.js";
import { SyntaxTreeNode } from "../types.js";
import {parse} from "./parser.js";
import {transform} from "./transform.js";

const transformTest = (input: string, expected: SyntaxTreeNode) => {
    return () => expect(transform(parse(input))).toStrictEqual(expected);
}

describe("transform-primitive", () => {
    test("transform-number", transformTest(
        "1.2", createNumber(1.2)
    ));

    test("transform-boolean", transformTest(
        "true", createBoolean(true)
    ));

    test("transform-symbol", transformTest(
        "xyz", createSymbol("xyz")
    ));
});

describe("transform-numeric-expression", () => {
    test("transform-sum", transformTest(
        "1+2-3", createAdd(
            createAdd(
                createNumber(1),
                createNumber(2)
            ),
            createMul(
                createNumber(-1),
                createNumber(3)
            )
        )
    ));

    test("transform-product", transformTest(
        "1*2/3", createMul(
            createMul(
                createNumber(1),
                createNumber(2),
            ),
            createPow(
                createNumber(3),
                createNumber(-1)
            )
        )
    ));

    test("transform-power", transformTest(
        "a^b", createPow(
            createSymbol("a"),
            createSymbol("b")
        )
    ));
});

describe("transform-boolean-expression", () => {
    test("transform-not", transformTest(
        "!x", createNot(createSymbol("x"))
    ));

    test("transform-and", transformTest(
        "a & b & c", createAnd(
            createSymbol("a"),
            createAnd(
                createSymbol("b"),
                createSymbol("c")
            )
        )
    ));

    test("transform-or", transformTest(
        "a | b | c", createOr(
            createSymbol("a"),
            createOr(
                createSymbol("b"),
                createSymbol("c")
            )
        )
    ));

    test("transform-and-or", transformTest(
        "a & b | c", createOr(
            createAnd(
                createSymbol("a"),
                createSymbol("b")
            ),
            createSymbol("c")
        )
    ));

    describe("transform-relation", () => {
        test("transform-less-than", transformTest(
            "a < b < c", createAnd(
                createLessThan(
                    createSymbol("a"),
                    createSymbol("b")
                ),
                createLessThan(
                    createSymbol("b"),
                    createSymbol("c")
                )
            )
        ));

        test("transform-less-than-or-equal", transformTest(
            "a <= b <= c", createAnd(
                createLessThanOrEqual(
                    createSymbol("a"),
                    createSymbol("b")
                ),
                createLessThanOrEqual(
                    createSymbol("b"),
                    createSymbol("c")
                )
            )
        ));

        test("transform-greater-than", transformTest(
            "a > b > c", createAnd(
                createGreaterThan(
                    createSymbol("a"),
                    createSymbol("b")
                ),
                createGreaterThan(
                    createSymbol("b"),
                    createSymbol("c")
                )
            )
        ));

        test("transform-greater-than-or-equal", transformTest(
            "a >= b >= c", createAnd(
                createGreaterThanOrEqual(
                    createSymbol("a"),
                    createSymbol("b")
                ),
                createGreaterThanOrEqual(
                    createSymbol("b"),
                    createSymbol("c")
                )
            )
        ));

        test("transform-mixed-relations", transformTest(
            "a < b >= c", createAnd(
                createLessThan(
                    createSymbol("a"),
                    createSymbol("b")
                ),
                createGreaterThanOrEqual(
                    createSymbol("b"),
                    createSymbol("c")
                )
            )
        ));

        test("transform-single-relation", transformTest(
            "a < b", createLessThan(
                createSymbol("a"),
                createSymbol("b")
            )
        ));
    });
});

describe("transform-miscellaneous", () => {
    test("transform-symbol-definition", transformTest(
        "a:=2", createDefinition(
            createSymbol("a"),
            createNumber(2)
        )
    ));

    test("transform-function-definition", transformTest(
        "f(x: number) := 1", createDefinition(
            createFunctionSignature(
                "f", [{name: "x", type: "number"}]
            ), createNumber(1)
        )
    ));

    test("transform-vector", transformTest(
        "[1,2,3]", createVector([
            createNumber(1),
            createNumber(2),
            createNumber(3),
        ])
    ));

    test("transform-nested-vectors", transformTest(
        "[[1,2],[3,4]]", createVector([
            createVector([
                createNumber(1),
                createNumber(2),
            ]),
            createVector([
                createNumber(3),
                createNumber(4),
            ])
        ])
    ));

    test("transform-function-call", transformTest(
        "f(x,y)", createFunctionCall(
            "f", 
            [createSymbol("x"), createSymbol("y")]
        )
    ));
});