import { SyntaxTreeNode } from '../types/SyntaxTreeNodes';
import createAnd from '../create/create-and';
import createBooleanNode from '../create/create-boolean-node';
import createDivided from '../create/create-divided';
import createEquals from '../create/create-equals';
import createFunctionCall from '../create/create-function-call';
import createGreater from '../create/create-greater';
import createGreaterOrEquals from '../create/create-greater-or-equals';
import createLess from '../create/create-less';
import createLessOrEquals from '../create/create-less-or-equals';
import createMinus from '../create/create-minus';
import createNegate from '../create/create-negate';
import createNumberNode from '../create/create-number-node';
import createOr from '../create/create-or';
import createPlus from '../create/create-plus';
import createPower from '../create/create-power';
import createSymbolNode from '../create/create-symbol-node';
import createTimes from '../create/create-times';
import createVector from '../create/create-vector';
import createFunction from '../create/create-function';
import createDefine from '../create/create-define';
import createLambda from '../create/create-lambda';

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
