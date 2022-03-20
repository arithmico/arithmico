import { Context } from '../types';
import createAnd from '../create/And';
import createBooleanNode from '../create/BooleanNode';
import createNumberNode from '../create/NumberNode';
import createOr from '../create/Or';
import createSymbolNode from '../create/SymbolNode';
import evaluate from '../eval';
import createEquals from '../create/Equals';
import createLess from '../create/Less';
import createGreater from '../create/Greater';
import createLessOrEquals from '../create/LessOrEquals';
import createGreaterOrEquals from '../create/GreaterOrEquals';
import createDefineVariable from '../create/DefineVariable';
import createDefineFunction from '../create/DefineFunction';
import createFunctionCall from '../create/FunctionCall';
import createPlus from '../create/Plus';
import { DefineFunctionParameterType } from '../types/SyntaxTreeNodes';
import createVector from '../create/Vector';
import createNegate from '../create/Negate';
import createMinus from '../create/Minus';
import createTimes from '../create/Times';
import createDivided from '../create/Divided';
import createPower from '../create/Power';

const testContext: Context = {
    options: {
        decimalPlaces: 6,
        magnitudeThresholdForScientificNotation: 6,
        decimalSeparator: '.',
    },
    stack: [
        {
            a: { type: 'value', value: createNumberNode(42) },
            g: {
                type: 'function',
                evaluateParametersBefore: true,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                evaluator: (_params, _context) => createNumberNode(42),
            },
        },
    ],
};

describe('evaluate primitive nodes', () => {
    test('evaluate number', () => {
        expect(evaluate(createNumberNode(42), testContext)).toStrictEqual(createNumberNode(42));
    });

    test('evaluate boolean', () => {
        expect(evaluate(createBooleanNode(true), testContext)).toStrictEqual(createBooleanNode(true));
    });

    test('evaluate symbol', () => {
        expect(evaluate(createSymbolNode('a'), testContext)).toStrictEqual(createNumberNode(42));
    });

    test('evaluate symbol - throw (function)', () => {
        expect(() => evaluate(createSymbolNode('g'), testContext)).toThrow();
    });

    test('evaluate symbol - throw (not found)', () => {
        expect(() => evaluate(createSymbolNode('x'), testContext)).toThrow();
    });
});

describe('evaluate logic nodes', () => {
    describe('evaluate or', () => {
        test('evalaute or - true', () => {
            expect(evaluate(createOr(createBooleanNode(true), createBooleanNode(false)), testContext)).toStrictEqual(
                createBooleanNode(true),
            );
        });

        test('evalaute or - false', () => {
            expect(evaluate(createOr(createBooleanNode(false), createBooleanNode(false)), testContext)).toStrictEqual(
                createBooleanNode(false),
            );
        });

        test('evalaute or - throw', () => {
            expect(() => evaluate(createOr(createNumberNode(42), createBooleanNode(false)), testContext)).toThrow();
        });
    });

    describe('evaluate and', () => {
        test('evalaute and - true', () => {
            expect(evaluate(createAnd(createBooleanNode(true), createBooleanNode(true)), testContext)).toStrictEqual(
                createBooleanNode(true),
            );
        });

        test('evalaute and - false', () => {
            expect(evaluate(createAnd(createBooleanNode(false), createBooleanNode(true)), testContext)).toStrictEqual(
                createBooleanNode(false),
            );
        });

        test('evalaute and - throw', () => {
            expect(() => evaluate(createAnd(createNumberNode(42), createBooleanNode(false)), testContext)).toThrow();
        });
    });

    describe('evaluate equals', () => {
        test('evalaute equals - true (boolean)', () => {
            expect(evaluate(createEquals(createBooleanNode(true), createBooleanNode(true)), testContext)).toStrictEqual(
                createBooleanNode(true),
            );
        });

        test('evalaute equals - true (number)', () => {
            expect(evaluate(createEquals(createNumberNode(42), createNumberNode(42)), testContext)).toStrictEqual(
                createBooleanNode(true),
            );
        });

        test('evalaute equals - false (boolean)', () => {
            expect(
                evaluate(createEquals(createBooleanNode(true), createBooleanNode(false)), testContext),
            ).toStrictEqual(createBooleanNode(false));
        });

        test('evalaute equals - false (number)', () => {
            expect(evaluate(createEquals(createNumberNode(42), createNumberNode(24)), testContext)).toStrictEqual(
                createBooleanNode(false),
            );
        });

        test('evalaute equals - throw', () => {
            expect(() => evaluate(createEquals(createNumberNode(42), createBooleanNode(false)), testContext)).toThrow();
        });
    });

    describe('evaluate less', () => {
        test('evalaute less - true', () => {
            expect(evaluate(createLess(createNumberNode(24), createNumberNode(42)), testContext)).toStrictEqual(
                createBooleanNode(true),
            );
        });

        test('evalaute less - false', () => {
            expect(evaluate(createLess(createNumberNode(42), createNumberNode(24)), testContext)).toStrictEqual(
                createBooleanNode(false),
            );
        });

        test('evalaute less - throw', () => {
            expect(() => evaluate(createLess(createNumberNode(42), createBooleanNode(false)), testContext)).toThrow();
        });
    });

    describe('evaluate greater', () => {
        test('evalaute greater - false', () => {
            expect(evaluate(createGreater(createNumberNode(24), createNumberNode(42)), testContext)).toStrictEqual(
                createBooleanNode(false),
            );
        });

        test('evalaute greater - true', () => {
            expect(evaluate(createGreater(createNumberNode(42), createNumberNode(24)), testContext)).toStrictEqual(
                createBooleanNode(true),
            );
        });

        test('evalaute greater - throw', () => {
            expect(() =>
                evaluate(createGreater(createNumberNode(42), createBooleanNode(false)), testContext),
            ).toThrow();
        });
    });

    describe('evaluate less or equals', () => {
        test('evalaute less or equals - true (less)', () => {
            expect(evaluate(createLessOrEquals(createNumberNode(24), createNumberNode(42)), testContext)).toStrictEqual(
                createBooleanNode(true),
            );
        });

        test('evalaute less or equals - true (equals)', () => {
            expect(evaluate(createLessOrEquals(createNumberNode(42), createNumberNode(42)), testContext)).toStrictEqual(
                createBooleanNode(true),
            );
        });

        test('evalaute less or equals - false', () => {
            expect(evaluate(createLessOrEquals(createNumberNode(42), createNumberNode(24)), testContext)).toStrictEqual(
                createBooleanNode(false),
            );
        });

        test('evalaute less or equals - throw', () => {
            expect(() =>
                evaluate(createLessOrEquals(createNumberNode(42), createBooleanNode(false)), testContext),
            ).toThrow();
        });
    });

    describe('evaluate greater or equals', () => {
        test('evalaute greater or equals - false', () => {
            expect(
                evaluate(createGreaterOrEquals(createNumberNode(24), createNumberNode(42)), testContext),
            ).toStrictEqual(createBooleanNode(false));
        });

        test('evalaute greater or equals - true (greater)', () => {
            expect(
                evaluate(createGreaterOrEquals(createNumberNode(42), createNumberNode(24)), testContext),
            ).toStrictEqual(createBooleanNode(true));
        });

        test('evalaute greater or equals - true (equals)', () => {
            expect(
                evaluate(createGreaterOrEquals(createNumberNode(42), createNumberNode(42)), testContext),
            ).toStrictEqual(createBooleanNode(true));
        });

        test('evalaute greater or equals - throw', () => {
            expect(() =>
                evaluate(createGreaterOrEquals(createNumberNode(42), createBooleanNode(false)), testContext),
            ).toThrow();
        });
    });
});

describe('evaluate define nodes', () => {
    const invalidContext: Context = { ...testContext, stack: [] };

    test('evaluate define variable - throw', () => {
        expect(() => evaluate(createDefineVariable('a', createNumberNode(42)), invalidContext)).toThrow();
    });

    test('evaluate define variable', () => {
        const context: Context = { ...testContext, stack: [{}] };
        evaluate(createDefineVariable('a', createNumberNode(42)), context);
        expect(context.stack[0]['a']).not.toBeUndefined();
    });

    test('evaluate deinfe function - throw', () => {
        expect(() => evaluate(createDefineFunction('f', [], createNumberNode(42)), invalidContext)).toThrow();
    });

    test('evaluate define function', () => {
        const context: Context = { ...testContext, stack: [{}] };
        evaluate(createDefineFunction('f', [], createNumberNode(42)), context);
        expect(context.stack[0]['f']).not.toBeUndefined();
    });
});

describe('evaluate arithmetic nodes', () => {
    describe('evaluate plus node', () => {
        test('evaluate plus', () => {
            expect(evaluate(createPlus(createNumberNode(1), createNumberNode(2)), testContext)).toStrictEqual(
                createNumberNode(3),
            );
        });

        test('evaluate plus - vectors', () => {
            expect(
                evaluate(
                    createPlus(
                        createVector([createNumberNode(1), createNumberNode(2)]),
                        createVector([createNumberNode(3), createNumberNode(4)]),
                    ),
                    testContext,
                ),
            ).toStrictEqual(createVector([createNumberNode(4), createNumberNode(6)]));
        });

        test('evaluate plus - throw', () => {
            expect(() => evaluate(createPlus(createNumberNode(1), createBooleanNode(true)), testContext)).toThrow();
        });

        test('evaluate plus - throw incompatible shapes', () => {
            expect(() =>
                evaluate(
                    createPlus(
                        createVector([createNumberNode(1), createNumberNode(2)]),
                        createVector([createNumberNode(3), createNumberNode(4), createNumberNode(5)]),
                    ),
                    testContext,
                ),
            ).toThrow();
        });
    });

    describe('evaluate minus node', () => {
        test('evaluate minus', () => {
            expect(evaluate(createMinus(createNumberNode(1), createNumberNode(2)), testContext)).toStrictEqual(
                createNumberNode(-1),
            );
        });

        test('evaluate minus - throw', () => {
            expect(() => evaluate(createMinus(createNumberNode(1), createBooleanNode(true)), testContext)).toThrow();
        });
    });

    describe('evaluate times node', () => {
        test('evaluate times', () => {
            expect(evaluate(createTimes(createNumberNode(3), createNumberNode(2)), testContext)).toStrictEqual(
                createNumberNode(6),
            );
        });

        test('evaluate times (vector * number)', () => {
            expect(
                evaluate(
                    createTimes(createVector([createNumberNode(1), createNumberNode(2)]), createNumberNode(3)),
                    testContext,
                ),
            ).toStrictEqual(createVector([createNumberNode(3), createNumberNode(6)]));
        });

        test('evaluate times (number * vector)', () => {
            expect(
                evaluate(
                    createTimes(createNumberNode(3), createVector([createNumberNode(1), createNumberNode(2)])),
                    testContext,
                ),
            ).toStrictEqual(createVector([createNumberNode(3), createNumberNode(6)]));
        });

        test('evaluate times (number * nested vector)', () => {
            expect(
                evaluate(
                    createTimes(
                        createNumberNode(2),
                        createVector([createNumberNode(1), createVector([createNumberNode(2), createNumberNode(3)])]),
                    ),
                    testContext,
                ),
            ).toStrictEqual(
                createVector([createNumberNode(2), createVector([createNumberNode(4), createNumberNode(6)])]),
            );
        });

        test('evaluate times - vector1d * vector1d', () => {
            const vectorA = createVector([createNumberNode(1), createNumberNode(2), createNumberNode(3)]);
            const vectorB = createVector([createNumberNode(4), createNumberNode(5), createNumberNode(6)]);
            const result = createNumberNode(1 * 4 + 2 * 5 + 3 * 6);
            expect(evaluate(createTimes(vectorA, vectorB), testContext)).toStrictEqual(result);
        });

        test('evaluate times - vector1d (1 element) * vector1d (1 element)', () => {
            const vectorA = createVector([createNumberNode(1)]);
            const vectorB = createVector([createNumberNode(4)]);
            const result = createNumberNode(1 * 4);
            expect(evaluate(createTimes(vectorA, vectorB), testContext)).toStrictEqual(result);
        });

        test('evaluate times - vector2d * vector2d', () => {
            const vectorA = createVector([createVector([createNumberNode(3), createNumberNode(4)])]);
            const vectorB = createVector([createVector([createNumberNode(1)]), createVector([createNumberNode(2)])]);
            const result = createVector([createVector([createNumberNode(1 * 3 + 4 * 2)])]);
            expect(evaluate(createTimes(vectorA, vectorB), testContext)).toStrictEqual(result);
        });

        test('evaluate times - throw', () => {
            expect(() => evaluate(createTimes(createNumberNode(1), createBooleanNode(true)), testContext)).toThrow();
        });

        test('evaluate times - throw (incompatible shapes 1d)', () => {
            const vectorA = createVector([createNumberNode(1), createNumberNode(2)]);
            const vectorB = createVector([createNumberNode(4), createNumberNode(5), createNumberNode(6)]);
            expect(() => evaluate(createTimes(vectorA, vectorB), testContext)).toThrow();
        });

        test('evaluate times - throw (incompatible shapes 2d)', () => {
            const vectorA = createVector([
                createVector([createNumberNode(3), createNumberNode(4), createNumberNode(5)]),
            ]);
            const vectorB = createVector([createVector([createNumberNode(1)]), createVector([createNumberNode(2)])]);
            expect(() => evaluate(createTimes(vectorA, vectorB), testContext)).toThrow();
        });

        test('evaluate times - throw (dimension > 2)', () => {
            const vectorA = createVector([createVector([createVector([createNumberNode(1)])])]);
            const vectorB = createVector([createVector([createNumberNode(1)]), createVector([createNumberNode(2)])]);
            expect(() => evaluate(createTimes(vectorA, vectorB), testContext)).toThrow();
        });

        test('evaluate times - throw (empty vector)', () => {
            const vectorA = createVector([]);
            const vectorB = createVector([]);
            expect(() => evaluate(createTimes(vectorA, vectorB), testContext)).toThrow();
        });
    });

    describe('evaluate divided node', () => {
        test('evaluate divided', () => {
            expect(evaluate(createDivided(createNumberNode(4), createNumberNode(2)), testContext)).toStrictEqual(
                createNumberNode(2),
            );
        });

        test('evaluate divided - throw', () => {
            expect(() => evaluate(createDivided(createNumberNode(1), createBooleanNode(true)), testContext)).toThrow();
        });

        test('evaluate divided - throw (divide by zero)', () => {
            expect(() => evaluate(createDivided(createNumberNode(1), createNumberNode(0)), testContext)).toThrow();
        });
    });

    describe('evaluate power node', () => {
        test('evaluate power', () => {
            expect(evaluate(createPower(createNumberNode(4), createNumberNode(2)), testContext)).toStrictEqual(
                createNumberNode(16),
            );
        });

        test('evaluate power - throw', () => {
            expect(() => evaluate(createPower(createNumberNode(1), createBooleanNode(true)), testContext)).toThrow();
        });

        test('evaluate power - throw (zero base, negative exp)', () => {
            expect(() => evaluate(createPower(createNumberNode(0), createNumberNode(-1)), testContext)).toThrow();
        });
    });
});

describe('evaluate miscellaneous nodes', () => {
    test('evaluate function call', () => {
        const context: Context = { ...testContext, stack: [{}] };
        evaluate(
            createDefineFunction(
                'f',
                [{ name: 'x', type: DefineFunctionParameterType.Number }],
                createPlus(createSymbolNode('x'), createNumberNode(1)),
            ),
            context,
        );
        expect(evaluate(createFunctionCall('f', [createNumberNode(41)]), context)).toStrictEqual(createNumberNode(42));
    });

    test('evaluate function call (type=any)', () => {
        const context: Context = { ...testContext, stack: [{}] };
        evaluate(
            createDefineFunction(
                'f',
                [{ name: 'x', type: DefineFunctionParameterType.Any }],
                createPlus(createSymbolNode('x'), createNumberNode(1)),
            ),
            context,
        );
        expect(evaluate(createFunctionCall('f', [createNumberNode(41)]), context)).toStrictEqual(createNumberNode(42));
    });

    test('evaluate function call (evaluateParametersBefore=false)', () => {
        const context: Context = {
            ...testContext,
            stack: [
                {
                    f: {
                        type: 'function',
                        evaluateParametersBefore: false,
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        evaluator: (_parameters, _context) => createBooleanNode(true),
                    },
                },
            ],
        };

        expect(evaluate(createFunctionCall('f', [createNumberNode(41)]), context)).toStrictEqual(
            createBooleanNode(true),
        );
    });

    test('evaluate function call - throw (undefined)', () => {
        expect(() => evaluate(createFunctionCall('f', [createNumberNode(41)]), testContext)).toThrow();
    });

    test('evaluate function call - throw (not a function)', () => {
        expect(() => evaluate(createFunctionCall('a', [createNumberNode(41)]), testContext)).toThrow();
    });

    test('evaluate function call - throw (invalid number of arguments)', () => {
        const context: Context = { ...testContext, stack: [{}] };
        evaluate(
            createDefineFunction(
                'f',
                [{ name: 'x', type: DefineFunctionParameterType.Number }],
                createPlus(createSymbolNode('x'), createNumberNode(1)),
            ),
            context,
        );
        expect(() =>
            evaluate(createFunctionCall('f', [createNumberNode(41), createNumberNode(12)]), context),
        ).toThrow();
    });

    test('evaluate function call - throw (invalid type) (number)', () => {
        const context: Context = { ...testContext, stack: [{}] };
        evaluate(
            createDefineFunction(
                'f',
                [{ name: 'x', type: DefineFunctionParameterType.Number }],
                createPlus(createSymbolNode('x'), createNumberNode(1)),
            ),
            context,
        );
        expect(() => evaluate(createFunctionCall('f', [createBooleanNode(true)]), context)).toThrow();
    });

    test('evaluate function call - throw (invalid type) (boolean)', () => {
        const context: Context = { ...testContext, stack: [{}] };
        evaluate(
            createDefineFunction(
                'f',
                [{ name: 'x', type: DefineFunctionParameterType.Boolean }],
                createAnd(createSymbolNode('x'), createBooleanNode(true)),
            ),
            context,
        );
        expect(() => evaluate(createFunctionCall('f', [createNumberNode(42)]), context)).toThrow();
    });

    test('evaluate function call - throw (invalid type) (vector)', () => {
        const context: Context = { ...testContext, stack: [{}] };
        evaluate(
            createDefineFunction(
                'f',
                [{ name: 'x', type: DefineFunctionParameterType.Vector }],
                createTimes(createSymbolNode('x'), createNumberNode(12)),
            ),
            context,
        );
        expect(() => evaluate(createFunctionCall('f', [createNumberNode(42)]), context)).toThrow();
    });

    test('evaluate vector', () => {
        expect(
            evaluate(createVector([createPlus(createNumberNode(1), createNumberNode(2))]), testContext),
        ).toStrictEqual(createVector([createNumberNode(3)]));
    });

    test('evaluate negate - boolean', () => {
        expect(evaluate(createNegate(createBooleanNode(false)), testContext)).toStrictEqual(createBooleanNode(true));
    });

    test('evaluate negate - number', () => {
        expect(evaluate(createNegate(createNumberNode(10)), testContext)).toStrictEqual(createNumberNode(-10));
    });

    test('evaluate negate - throw', () => {
        expect(() => evaluate(createNegate(createVector([])), testContext)).toThrow();
    });
});

test('evaluate unknown node type', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => evaluate({ type: 'foo' }, testContext)).toThrow();
});
