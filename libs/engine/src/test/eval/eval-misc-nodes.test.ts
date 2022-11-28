import { Context, FunctionNode, SyntaxTreeNode } from '../../types';
import createBooleanNode from '../../create/create-boolean-node';
import createNumberNode from '../../create/create-number-node';
import evaluate from '../../eval';
import createPlus from '../../create/create-plus';
import createVector from '../../create/create-vector';
import createNegate from '../../create/create-negate';
import createLambda from '../../create/create-lambda';
import createSymbolNode from '../../create/create-symbol-node';
import createFunctionCall from '../../create/create-function-call';
import { createContext } from '../../utils/context-utils';
import createFunction from '../../create/create-function';

const testContext = createContext({
    stack: [
        new Map<string, SyntaxTreeNode>([
            ['a', createNumberNode(42)],
            [
                'g',
                createFunction(
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    (_params: SyntaxTreeNode[], _context: Context) => createNumberNode(42),
                    [{ type: 'number', name: 'x', evaluate: true }],
                    createNumberNode(42),
                ),
            ],
        ]),
    ],
});

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
