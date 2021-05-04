import {Context, SyntaxTreeNode, Number} from "../types.js";
import evaluate from "./evaluate.js";
import {parse} from "../parse/parser.js";
import {transform} from "../parse/transform.js";
import {createBoolean, createNumber} from "../create/create.js";

const emptyContext: Context = {
    options: {
        decimalSeparator: ".",
        decimalPlaces: 10,
    },
    stack: []
};

const defaultContext: Context = {
    ...emptyContext, stack: [{
        a: {
            type: "value",
            value: createNumber(5)
        },
        f: {
            type: "function",
            rawChildren: false,
            evaluator: parameters => createNumber((parameters[0] as Number).value + (parameters[1] as Number).value)
        }
    }]
};

const evalTest = (input: string, expected: SyntaxTreeNode, context: Context = emptyContext) => () => expect(evaluate(transform(parse(input)), context)).toStrictEqual(expected);

describe("evaluate-functions", () => {
    test("evaluate-generic-function", evalTest(
        "f(6,2)", createNumber(8), defaultContext
    ));
});

describe("evaluate-primitives", () => {
    test("evaluate-boolean", evalTest(
        "true", createBoolean(true)
    ));

    test("evaluate-number", evalTest(
        "1.2", createNumber(1.2)
    ));

    test("evaluate-symbol", evalTest(
        "a", createNumber(5), defaultContext
    ));
});

describe("evaluate-boolean-expression", () => {
    test("evaluate-and-1", evalTest(
        "true & true", createBoolean(true)
    ));

    test("evaluate-and-2", evalTest(
        "true & false", createBoolean(false)
    ));

    test("evaluate-and-3", evalTest(
        "false & true", createBoolean(false)
    ));

    test("evaluate-and-4", evalTest(
        "false & false", createBoolean(false)
    ));

    describe("evaluate-relation", () => {
        test("evaluate-equal-1", evalTest(
            "true = false", createBoolean(false)
        ));

        test("evaluate-equal-2", evalTest(
            "a = a", createBoolean(true), defaultContext
        ));

        test("evaluate-equal-3", evalTest(
            "true & true = false | true", createBoolean(true)
        ));

        describe("evaluate-partial-order", () => {
            test("evaluate-less-than-1", evalTest(
                "1 < 2", createBoolean(true)
            ));

            test("evaluate-less-than-2", evalTest(
                "2 < 2", createBoolean(false)
            ));

            test("evaluate-less-than-3", evalTest(
                "2 < 1", createBoolean(false)
            ));

            test("evaluate-greater-than-1", evalTest(
                "1 > 2", createBoolean(false)
            ));

            test("evaluate-greater-than-2", evalTest(
                "2 > 2", createBoolean(false)
            ));

            test("evaluate-greater-than-3", evalTest(
                "2 > 1", createBoolean(true)
            ));

            test("evaluate-less-than-or-equal-1", evalTest(
                "1 <= 2", createBoolean(true)
            ));

            test("evaluate-less-than-or-equal-2", evalTest(
                "2 <= 2", createBoolean(true)
            ));

            test("evaluate-less-than-or-equal-3", evalTest(
                "2 <= 1", createBoolean(false)
            ));

            test("evaluate-greater-than-or-equal-1", evalTest(
                "1 >= 2", createBoolean(false)
            ));

            test("evaluate-greater-than-or-equal-2", evalTest(
                "2 >= 2", createBoolean(true)
            ));

            test("evaluate-greater-than-or-equal-3", evalTest(
                "2 >= 1", createBoolean(true)
            ));
        });
    });
});

describe("evaluate-numeric-expression", () => {
    test("evaluate-add", evalTest("2+8", createNumber(10)));
    test("evaluate-sub-1", evalTest("22-18", createNumber(4)));
    test("evaluate-sub-2", evalTest("15-28", createNumber(-13)));
    test("evaluate-mul-1", evalTest("10*3", createNumber(30)));
    test("evaluate-mul-2", evalTest("10*(-3)", createNumber(-30)));
    test("evaluate-div-1", evalTest("10/5", createNumber(2)));
    test("evaluate-div-2", evalTest("2/3", createNumber(2/3)));
    test("evaluate-pow-1", evalTest("2^3", createNumber(8)));
    test("evaluate-pow-2", evalTest("4^(-2)", createNumber(Math.pow(4, -2))));
});