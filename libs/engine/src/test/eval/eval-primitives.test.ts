import createBooleanNode from '../../create-node/create-boolean-node';
import createNumberNode from '../../create-node/create-number-node';
import createSymbolNode from '../../create-node/create-symbol-node';
import evaluate from '../../evaluate-node';
import { createContext } from '../../utils/context-utils';

const testContext = createContext({ stack: [new Map([['a', createNumberNode(42)]])] });

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
