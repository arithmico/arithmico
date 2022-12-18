import createNumberNode from '../../create-node/create-number-node';
import { Context } from '../../types';
import { createOptions, insertStackObject, serializeStack } from '../../utils/context-utils';

const testContext: Context = {
    options: createOptions({
        decimalPlaces: 5,
        decimalSeparator: ',',
        magnitudeThresholdForScientificNotation: 5,
        angleUnit: 'degrees',
    }),
    stack: [new Map()],
    methods: new Map(),
};

test('insert stack object', () => {
    expect(insertStackObject('foo', createNumberNode(42), testContext)).toStrictEqual({
        ...testContext,
        stack: [new Map([['foo', createNumberNode(42)]])],
    });
});

test('insert stack object - skip empty stack frame', () => {
    expect(
        insertStackObject('foo', createNumberNode(42), { ...testContext, stack: [new Map(), new Map()] }),
    ).toStrictEqual({
        ...testContext,
        stack: [new Map(), new Map([['foo', createNumberNode(42)]])],
    });
});

test('insert stack object - throw', () => {
    expect(() => insertStackObject('foo', createNumberNode(42), { ...testContext, stack: [] })).toThrow();
});

test('serialize stack', () => {
    expect(serializeStack({ ...testContext, stack: [new Map([['foo', createNumberNode(42)]])] })).toStrictEqual({
        foo: '42',
    });
});

test('serialize stack - empty', () => {
    expect(serializeStack({ ...testContext, stack: [] })).toStrictEqual({});
});
