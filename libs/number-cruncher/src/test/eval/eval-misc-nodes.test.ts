import { Context, FunctionNode } from '../../types';
import createBooleanNode from '../../create/create-boolean-node';
import createNumberNode from '../../create/create-number-node';
import evaluate from '../../eval';
import createPlus from '../../create/create-plus';
import createVector from '../../create/create-vector';
import createNegate from '../../create/create-negate';
import createLambda from '../../create/create-lambda';
import createSymbolNode from '../../create/create-symbol-node';
import createFunctionCall from '../../create/create-function-call';
import { createOptions } from '../../utils/context-utils';

const testContext: Context = {
    options: createOptions(),
    stack: [
        {
            a: createNumberNode(42),
            g: {
                type: 'function',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                evaluator: (_params, _context) => createNumberNode(42),
                expression: createNumberNode(42),
                header: [{ type: 'number', name: 'x', evaluate: true }],
            },
        },
    ],
};

test('evaluate vector', () => {
    expect(evaluate(createVector([createPlus(createNumberNode(1), createNumberNode(2))]), testContext)).toStrictEqual(
        createVector([createNumberNode(3)]),
    );
});

describe('evaluate negate', () => {
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

describe('evaluate lambda', () => {
    test('evaluate lambda', () => {
        const lambda = <FunctionNode>(
            evaluate(createLambda([{ type: 'number', name: 'x', evaluate: true }], createSymbolNode('x')), testContext)
        );
        expect(lambda.type).toBe('function');
        expect(lambda.header).toStrictEqual([{ type: 'number', name: 'x', evaluate: true }]);
        expect(lambda.expression).toStrictEqual(createSymbolNode('x'));
        expect(typeof lambda.evaluator).toBe('function');
    });

    test('evaluate lambda call', () => {
        const lambda = <FunctionNode>(
            evaluate(createLambda([{ type: 'number', name: 'x', evaluate: true }], createSymbolNode('x')), testContext)
        );
        expect(evaluate(createFunctionCall(lambda, [createNumberNode(42)]), testContext)).toStrictEqual(
            createNumberNode(42),
        );
    });
});

test('evaluate unknown node type', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => evaluate({ type: 'foo' }, testContext)).toThrow();
});
