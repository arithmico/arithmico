import createBooleanNode from '../../node-operations/create-node/create-boolean-node';
import createNumberNode from '../../node-operations/create-node/create-number-node';
import createSymbolNode from '../../node-operations/create-node/create-symbol-node';
import evaluate from '../../node-operations/evaluate-node';
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
