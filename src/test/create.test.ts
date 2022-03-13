import { DefineFunctionParameterType } from '../types/SyntaxTreeNodes';
import createAnd from '../create/And';
import createBooleanNode from '../create/BooleanNode';
import createDefineFunction from '../create/DefineFunction';
import createDefineFunctionParameter from '../create/DefineFunctionParameter';
import createDefineVariable from '../create/DefineVariable';
import createDivided from '../create/Divided';
import createEquals from '../create/Equals';
import createFunctionCall from '../create/FunctionCall';
import createGreater from '../create/Greater';
import createGreaterOrEquals from '../create/GreaterOrEquals';
import createLess from '../create/Less';
import createLessOrEquals from '../create/LessOrEquals';
import createMinus from '../create/Minus';
import createNegate from '../create/Negate';
import createNumberNode from '../create/NumberNode';
import createOr from '../create/Or';
import createPlus from '../create/Plus';
import createPower from '../create/Power';
import createSymbolNode from '../create/SymbolNode';
import createTimes from '../create/Times';
import createVector from '../create/Vector';

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

describe('create define nodes', () => {
    test('create define variable', () => {
        expect(createDefineVariable('foo', createNumberNode(42))).toEqual({
            type: 'defineVariable',
            name: 'foo',
            value: createNumberNode(42),
        });
    });

    test('create define function parameter number', () => {
        expect(createDefineFunctionParameter('foo', DefineFunctionParameterType.Number)).toEqual({
            name: 'foo',
            type: DefineFunctionParameterType.Number,
        });
    });

    test('create define function parameter boolean', () => {
        expect(createDefineFunctionParameter('foo', DefineFunctionParameterType.Boolean)).toEqual({
            name: 'foo',
            type: DefineFunctionParameterType.Boolean,
        });
    });

    test('create define function parameter vector', () => {
        expect(createDefineFunctionParameter('foo', DefineFunctionParameterType.Vector)).toEqual({
            name: 'foo',
            type: DefineFunctionParameterType.Vector,
        });
    });

    test('create define function parameter any', () => {
        expect(createDefineFunctionParameter('foo', DefineFunctionParameterType.Any)).toEqual({
            name: 'foo',
            type: DefineFunctionParameterType.Any,
        });
    });

    test('create define function', () => {
        expect(
            createDefineFunction(
                'foo',
                [createDefineFunctionParameter('bar', DefineFunctionParameterType.Number)],
                createNumberNode(42),
            ),
        ).toEqual({
            type: 'defineFunction',
            name: 'foo',
            parameters: [createDefineFunctionParameter('bar', DefineFunctionParameterType.Number)],
            value: createNumberNode(42),
        });
    });
});

describe('create miscellaneous nodes', () => {
    test('create function call', () => {
        expect(createFunctionCall('foo', [createNumberNode(42)])).toEqual({
            type: 'functionCall',
            name: 'foo',
            parameters: [createNumberNode(42)],
        });
    });

    test('create vector', () => {
        expect(createVector([createNumberNode(12), createNumberNode(42)])).toEqual({
            type: 'vector',
            values: [createNumberNode(12), createNumberNode(42)],
        });
    });
});
