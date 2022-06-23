import createAnd from '../../create/And';
import createBooleanNode from '../../create/BooleanNode';
import createEquals from '../../create/Equals';
import createGreater from '../../create/Greater';
import createGreaterOrEquals from '../../create/GreaterOrEquals';
import createLess from '../../create/Less';
import createLessOrEquals from '../../create/LessOrEquals';
import createNumberNode from '../../create/NumberNode';
import createOr from '../../create/Or';
import evaluate from '../../eval';
import { Context } from '../../types';
import { createOptions } from '../../utils/context-utils';

const testContext: Context = {
    options: createOptions(),
    stack: [{}],
};

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
        expect(evaluate(createEquals(createBooleanNode(true), createBooleanNode(false)), testContext)).toStrictEqual(
            createBooleanNode(false),
        );
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
        expect(() => evaluate(createGreater(createNumberNode(42), createBooleanNode(false)), testContext)).toThrow();
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
        expect(evaluate(createGreaterOrEquals(createNumberNode(24), createNumberNode(42)), testContext)).toStrictEqual(
            createBooleanNode(false),
        );
    });

    test('evalaute greater or equals - true (greater)', () => {
        expect(evaluate(createGreaterOrEquals(createNumberNode(42), createNumberNode(24)), testContext)).toStrictEqual(
            createBooleanNode(true),
        );
    });

    test('evalaute greater or equals - true (equals)', () => {
        expect(evaluate(createGreaterOrEquals(createNumberNode(42), createNumberNode(42)), testContext)).toStrictEqual(
            createBooleanNode(true),
        );
    });

    test('evalaute greater or equals - throw', () => {
        expect(() =>
            evaluate(createGreaterOrEquals(createNumberNode(42), createBooleanNode(false)), testContext),
        ).toThrow();
    });
});
