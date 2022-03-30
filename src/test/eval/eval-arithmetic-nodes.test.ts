import createBooleanNode from '../../create/BooleanNode';
import createDivided from '../../create/Divided';
import createMinus from '../../create/Minus';
import createNumberNode from '../../create/NumberNode';
import createPlus from '../../create/Plus';
import createPower from '../../create/Power';
import createTimes from '../../create/Times';
import createVector from '../../create/Vector';
import evaluate from '../../eval';
import { Context } from '../../types';

const testContext: Context = {
    options: {
        decimalPlaces: 6,
        magnitudeThresholdForScientificNotation: 6,
        decimalSeparator: '.',
    },
    stack: [
        {
            a: createNumberNode(42),
        },
    ],
};

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

    test('evaluate plus - vectors', () => {
        expect(
            evaluate(
                createMinus(
                    createVector([createNumberNode(1), createNumberNode(2)]),
                    createVector([createNumberNode(3), createNumberNode(4)]),
                ),
                testContext,
            ),
        ).toStrictEqual(createVector([createNumberNode(-2), createNumberNode(-2)]));
    });

    test('evaluate minus - throw', () => {
        expect(() => evaluate(createMinus(createNumberNode(1), createBooleanNode(true)), testContext)).toThrow();
    });

    test('evaluate plus - throw incompatible shapes', () => {
        expect(() =>
            evaluate(
                createMinus(
                    createVector([createNumberNode(1), createNumberNode(2)]),
                    createVector([createNumberNode(3), createNumberNode(4), createNumberNode(5)]),
                ),
                testContext,
            ),
        ).toThrow();
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
        ).toStrictEqual(createVector([createNumberNode(2), createVector([createNumberNode(4), createNumberNode(6)])]));
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

    test('evaluate times - vector2d * vector1d', () => {
        const vectorA = createVector([createNumberNode(3), createNumberNode(4)]);
        const vectorB = createVector([
            createVector([createNumberNode(1), createNumberNode(0)]),
            createVector([createNumberNode(0), createNumberNode(1)]),
        ]);
        expect(evaluate(createTimes(vectorB, vectorA), testContext)).toStrictEqual(vectorA);
    });

    test('evaluate times - vector1d * vector2d', () => {
        const vectorA = createVector([createNumberNode(3), createNumberNode(4)]);
        const vectorB = createVector([
            createVector([createNumberNode(1), createNumberNode(0)]),
            createVector([createNumberNode(0), createNumberNode(1)]),
        ]);
        expect(evaluate(createTimes(vectorA, vectorB), testContext)).toStrictEqual(vectorA);
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
        const vectorA = createVector([createVector([createNumberNode(3), createNumberNode(4), createNumberNode(5)])]);
        const vectorB = createVector([createVector([createNumberNode(1)]), createVector([createNumberNode(2)])]);
        expect(() => evaluate(createTimes(vectorA, vectorB), testContext)).toThrow();
    });

    test('evaluate times - throw (incompatible shape 2d * 1d)', () => {
        const vectorA = createVector([createNumberNode(3), createNumberNode(4), createNumberNode(1)]);
        const vectorB = createVector([
            createVector([createNumberNode(1), createNumberNode(0)]),
            createVector([createNumberNode(0), createNumberNode(1)]),
        ]);
        expect(() => evaluate(createTimes(vectorB, vectorA), testContext)).toThrow();
    });

    test('evaluate times - throw (incompatible shape 1d * 2d)', () => {
        const vectorA = createVector([createNumberNode(3), createNumberNode(4), createNumberNode(1)]);
        const vectorB = createVector([
            createVector([createNumberNode(1), createNumberNode(0)]),
            createVector([createNumberNode(0), createNumberNode(1)]),
        ]);
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
