import createBooleanNode from '../../create/BooleanNode';
import createNumberNode from '../../create/NumberNode';
import createSymbolNode from '../../create/SymbolNode';
import evaluate from '../../eval';
import { Context } from '../../types';
import { createOptions } from '../../utils/context-utils';

const testContext: Context = {
    options: createOptions(),
    stack: [
        {
            a: createNumberNode(42),
        },
    ],
};

test('evaluate number', () => {
    expect(evaluate(createNumberNode(42), testContext)).toStrictEqual(createNumberNode(42));
});

test('evaluate boolean', () => {
    expect(evaluate(createBooleanNode(true), testContext)).toStrictEqual(createBooleanNode(true));
});

test('evaluate symbol', () => {
    expect(evaluate(createSymbolNode('a'), testContext)).toStrictEqual(createNumberNode(42));
});

test('evaluate symbol - throw (not found)', () => {
    expect(() => evaluate(createSymbolNode('x'), testContext)).toThrow();
});
