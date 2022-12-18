import { SyntaxTreeNode } from '../types/SyntaxTreeNodes';
import createAnd from '../node-operations/create-node/create-and';
import createBooleanNode from '../node-operations/create-node/create-boolean-node';
import createDivided from '../node-operations/create-node/create-divided';
import createEquals from '../node-operations/create-node/create-equals';
import createFunctionCall from '../node-operations/create-node/create-function-call';
import createGreater from '../node-operations/create-node/create-greater';
import createGreaterOrEquals from '../node-operations/create-node/create-greater-or-equals';
import createLess from '../node-operations/create-node/create-less';
import createLessOrEquals from '../node-operations/create-node/create-less-or-equals';
import createMinus from '../node-operations/create-node/create-minus';
import createNegate from '../node-operations/create-node/create-negate';
import createNumberNode from '../node-operations/create-node/create-number-node';
import createOr from '../node-operations/create-node/create-or';
import createPlus from '../node-operations/create-node/create-plus';
import createPower from '../node-operations/create-node/create-power';
import createSymbolNode from '../node-operations/create-node/create-symbol-node';
import createTimes from '../node-operations/create-node/create-times';
import createVector from '../node-operations/create-node/create-vector';
import createFunction from '../node-operations/create-node/create-function';
import createDefine from '../node-operations/create-node/create-define';
import createLambda from '../node-operations/create-node/create-lambda';

describe('create primitives nodes', () => {
    test('create number', () => {
        expect(createNumberNode(42)).toEqual({ type: 'number', value: 42 });
    });

    test('create boolean', () => {
        expect(createBooleanNode(false)).toEqual({ type: 'boolean', value: false });
    });

    test('create symbol', () => {
        expect(createSymbolNode('foo')).toEqual({ type: 'symbol', name: 'foo' });
    });
});

describe('create logic nodes', () => {
    test('create or', () => {
        expect(createOr(createBooleanNode(false), createBooleanNode(true))).toEqual({
            type: 'or',
            left: createBooleanNode(false),
            right: createBooleanNode(true),
        });
    });

    test('create and', () => {
        expect(createAnd(createBooleanNode(false), createBooleanNode(true))).toEqual({
            type: 'and',
            left: createBooleanNode(false),
            right: createBooleanNode(true),
        });
    });

    test('create less', () => {
        expect(createLess(createBooleanNode(false), createBooleanNode(true))).toEqual({
            type: 'less',
            left: createBooleanNode(false),
            right: createBooleanNode(true),
        });
    });

    test('create greater', () => {
        expect(createGreater(createBooleanNode(false), createBooleanNode(true))).toEqual({
            type: 'greater',
            left: createBooleanNode(false),
            right: createBooleanNode(true),
        });
    });

    test('create less or equals', () => {
        expect(createLessOrEquals(createBooleanNode(false), createBooleanNode(true))).toEqual({
            type: 'lessOrEquals',
            left: createBooleanNode(false),
            right: createBooleanNode(true),
        });
    });

    test('create greater or equals', () => {
        expect(createGreaterOrEquals(createBooleanNode(false), createBooleanNode(true))).toEqual({
            type: 'greaterOrEquals',
            left: createBooleanNode(false),
            right: createBooleanNode(true),
        });
    });

    test('create equals', () => {
        expect(createEquals(createBooleanNode(false), createBooleanNode(true))).toEqual({
            type: 'equals',
            left: createBooleanNode(false),
            right: createBooleanNode(true),
        });
    });
});

describe('create arithmetic nodes', () => {
    test('create plus', () => {
        expect(createPlus(createNumberNode(12), createNumberNode(42))).toEqual({
            type: 'plus',
            left: createNumberNode(12),
            right: createNumberNode(42),
        });
    });

    test('create minus', () => {
        expect(createMinus(createNumberNode(12), createNumberNode(42))).toEqual({
            type: 'minus',
            left: createNumberNode(12),
            right: createNumberNode(42),
        });
    });

    test('create negate', () => {
        expect(createNegate(createNumberNode(12))).toEqual({
            type: 'negate',
            value: createNumberNode(12),
        });
    });

    test('create times', () => {
        expect(createTimes(createNumberNode(12), createNumberNode(42))).toEqual({
            type: 'times',
            left: createNumberNode(12),
            right: createNumberNode(42),
        });
    });

    test('create divided', () => {
        expect(createDivided(createNumberNode(12), createNumberNode(42))).toEqual({
            type: 'divided',
            left: createNumberNode(12),
            right: createNumberNode(42),
        });
    });

    test('create power', () => {
        expect(createPower(createNumberNode(12), createNumberNode(42))).toEqual({
            type: 'power',
            left: createNumberNode(12),
            right: createNumberNode(42),
        });
    });
});

describe('create miscellaneous nodes', () => {
    test('create function call', () => {
        expect(createFunctionCall(createSymbolNode('foo'), [createNumberNode(42)])).toEqual({
            type: 'functionCall',
            function: createSymbolNode('foo'),
            parameters: [createNumberNode(42)],
        });
    });

    test('create function', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const evaluator = (_params: SyntaxTreeNode[]) => createNumberNode(42);
        expect(
            createFunction(evaluator, [{ type: 'number', name: 'x', evaluate: true }], createNumberNode(42)),
        ).toStrictEqual({
            type: 'function',
            evaluator,
            header: [{ type: 'number', name: 'x', evaluate: true }],
            expression: createNumberNode(42),
        });
    });

    test('create define', () => {
        expect(createDefine('foo', createNumberNode(42))).toStrictEqual({
            type: 'define',
            name: 'foo',
            value: createNumberNode(42),
        });
    });

    test('create lambda', () => {
        expect(createLambda([{ type: 'number', name: 'x', evaluate: true }], createNumberNode(42))).toStrictEqual({
            type: 'lambda',
            header: [{ type: 'number', name: 'x', evaluate: true }],
            expression: createNumberNode(42),
        });
    });

    test('create vector', () => {
        expect(createVector([createNumberNode(12), createNumberNode(42)])).toEqual({
            type: 'vector',
            values: [createNumberNode(12), createNumberNode(42)],
        });
    });
});
