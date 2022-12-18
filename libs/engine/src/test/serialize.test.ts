import createBooleanNode from '../create-node/create-boolean-node';
import createNumberNode from '../create-node/create-number-node';
import serialize from '../serialize-node';
import createSymbolNode from '../create-node/create-symbol-node';
import createOr from '../create-node/create-or';
import createAnd from '../create-node/create-and';
import createEquals from '../create-node/create-equals';
import createLess from '../create-node/create-less';
import createGreater from '../create-node/create-greater';
import createLessOrEquals from '../create-node/create-less-or-equals';
import createGreaterOrEquals from '../create-node/create-greater-or-equals';
import createVector from '../create-node/create-vector';
import createFunctionCall from '../create-node/create-function-call';
import createPlus from '../create-node/create-plus';
import createMinus from '../create-node/create-minus';
import createDivided from '../create-node/create-divided';
import createTimes from '../create-node/create-times';
import createPower from '../create-node/create-power';
import createNegate from '../create-node/create-negate';
import createFunction from '../create-node/create-function';
import { createOptions } from '../utils/context-utils';

const testOptions = createOptions({ decimalPlaces: 4 });

describe('serialize primitives', () => {
    describe('serialize number', () => {
        test('serialize number - zero', () => {
            expect(serialize(createNumberNode(0), testOptions)).toBe('0');
        });

        test('serialize number - positive', () => {
            expect(serialize(createNumberNode(10), testOptions)).toBe('10');
        });

        test('serialize number - negative', () => {
            expect(serialize(createNumberNode(-10), testOptions)).toBe('-10');
        });

        test('serialize number - round', () => {
            expect(serialize(createNumberNode(0.00009), testOptions)).toBe('0.0001');
        });

        test('serialize number - exp positive', () => {
            expect(serialize(createNumberNode(123456789), testOptions)).toBe('1.2346 * 10^8');
        });

        test('serialize number - exp negative', () => {
            expect(serialize(createNumberNode(0.000000123456), testOptions)).toBe('1.2346 * 10^(-7)');
        });
    });

    describe('serialize boolean', () => {
        test('serialize boolean - true', () => {
            expect(serialize(createBooleanNode(true), testOptions)).toBe('true');
        });

        test('serialize boolean - false', () => {
            expect(serialize(createBooleanNode(false), testOptions)).toBe('false');
        });
    });

    test('serialize symbol', () => {
        expect(serialize(createSymbolNode('foo'), testOptions)).toBe('foo');
    });
});

describe('serialize logic nodes', () => {
    describe('serialize or node', () => {
        test('serialize or', () => {
            expect(serialize(createOr(createBooleanNode(true), createBooleanNode(false)), testOptions)).toBe(
                'true | false',
            );
        });

        test('serialize or - chain', () => {
            expect(
                serialize(
                    createOr(createBooleanNode(true), createOr(createBooleanNode(false), createBooleanNode(true))),
                    testOptions,
                ),
            ).toBe('true | false | true');
        });
    });

    describe('serialize and node', () => {
        test('serialize and', () => {
            expect(serialize(createAnd(createBooleanNode(true), createBooleanNode(false)), testOptions)).toBe(
                'true & false',
            );
        });

        test('serialize and - brackets left', () => {
            expect(
                serialize(
                    createAnd(createOr(createBooleanNode(true), createBooleanNode(false)), createBooleanNode(true)),
                    testOptions,
                ),
            ).toBe('(true | false) & true');
        });

        test('serialize and - brackets left', () => {
            expect(
                serialize(
                    createAnd(createBooleanNode(true), createOr(createBooleanNode(false), createBooleanNode(true))),
                    testOptions,
                ),
            ).toBe('true & (false | true)');
        });

        test('serialize and - chain', () => {
            expect(
                serialize(
                    createAnd(createBooleanNode(true), createAnd(createBooleanNode(false), createBooleanNode(true))),
                    testOptions,
                ),
            ).toBe('true & false & true');
        });
    });

    describe('serialize equals node', () => {
        test('serialize equals', () => {
            expect(serialize(createEquals(createBooleanNode(true), createBooleanNode(false)), testOptions)).toBe(
                'true = false',
            );
        });

        test('serialize equals - brackets left', () => {
            expect(
                serialize(
                    createEquals(createOr(createBooleanNode(true), createBooleanNode(false)), createBooleanNode(true)),
                    testOptions,
                ),
            ).toBe('(true | false) = true');
        });

        test('serialize equals - brackets left', () => {
            expect(
                serialize(
                    createEquals(createBooleanNode(true), createOr(createBooleanNode(false), createBooleanNode(true))),
                    testOptions,
                ),
            ).toBe('true = (false | true)');
        });

        test('serialize equals - chain', () => {
            expect(
                serialize(
                    createEquals(
                        createBooleanNode(true),
                        createEquals(createBooleanNode(false), createBooleanNode(true)),
                    ),
                    testOptions,
                ),
            ).toBe('true = false = true');
        });
    });

    describe('serialize less node', () => {
        test('serialize less', () => {
            expect(serialize(createLess(createSymbolNode('a'), createSymbolNode('b')), testOptions)).toBe('a < b');
        });

        test('serialize less - brackets left', () => {
            expect(
                serialize(
                    createLess(createOr(createSymbolNode('a'), createSymbolNode('b')), createSymbolNode('c')),
                    testOptions,
                ),
            ).toBe('(a | b) < c');
        });

        test('serialize less - brackets left', () => {
            expect(
                serialize(
                    createLess(createSymbolNode('a'), createOr(createSymbolNode('b'), createSymbolNode('c'))),
                    testOptions,
                ),
            ).toBe('a < (b | c)');
        });

        test('serialize less - chain', () => {
            expect(
                serialize(
                    createLess(createSymbolNode('a'), createLess(createSymbolNode('b'), createSymbolNode('c'))),
                    testOptions,
                ),
            ).toBe('a < b < c');
        });
    });

    describe('serialize greater node', () => {
        test('serialize greater', () => {
            expect(serialize(createGreater(createSymbolNode('a'), createSymbolNode('b')), testOptions)).toBe('a > b');
        });

        test('serialize greater - brackets left', () => {
            expect(
                serialize(
                    createGreater(createOr(createSymbolNode('a'), createSymbolNode('b')), createSymbolNode('c')),
                    testOptions,
                ),
            ).toBe('(a | b) > c');
        });

        test('serialize greater - brackets left', () => {
            expect(
                serialize(
                    createGreater(createSymbolNode('a'), createOr(createSymbolNode('b'), createSymbolNode('c'))),
                    testOptions,
                ),
            ).toBe('a > (b | c)');
        });

        test('serialize greater - chain', () => {
            expect(
                serialize(
                    createGreater(createSymbolNode('a'), createGreater(createSymbolNode('b'), createSymbolNode('c'))),
                    testOptions,
                ),
            ).toBe('a > b > c');
        });
    });

    describe('serialize less or equals node', () => {
        test('serialize less or equals', () => {
            expect(serialize(createLessOrEquals(createSymbolNode('a'), createSymbolNode('b')), testOptions)).toBe(
                'a <= b',
            );
        });

        test('serialize less or equals - brackets left', () => {
            expect(
                serialize(
                    createLessOrEquals(createOr(createSymbolNode('a'), createSymbolNode('b')), createSymbolNode('c')),
                    testOptions,
                ),
            ).toBe('(a | b) <= c');
        });

        test('serialize less or equals - brackets left', () => {
            expect(
                serialize(
                    createLessOrEquals(createSymbolNode('a'), createOr(createSymbolNode('b'), createSymbolNode('c'))),
                    testOptions,
                ),
            ).toBe('a <= (b | c)');
        });

        test('serialize less or equals - chain', () => {
            expect(
                serialize(
                    createLessOrEquals(
                        createSymbolNode('a'),
                        createLessOrEquals(createSymbolNode('b'), createSymbolNode('c')),
                    ),
                    testOptions,
                ),
            ).toBe('a <= b <= c');
        });
    });

    describe('serialize greater or equals node', () => {
        test('serialize greater or equals', () => {
            expect(serialize(createGreaterOrEquals(createSymbolNode('a'), createSymbolNode('b')), testOptions)).toBe(
                'a >= b',
            );
        });

        test('serialize greater or equals - brackets left', () => {
            expect(
                serialize(
                    createGreaterOrEquals(
                        createOr(createSymbolNode('a'), createSymbolNode('b')),
                        createSymbolNode('c'),
                    ),
                    testOptions,
                ),
            ).toBe('(a | b) >= c');
        });

        test('serialize greater or equals - brackets left', () => {
            expect(
                serialize(
                    createGreaterOrEquals(
                        createSymbolNode('a'),
                        createOr(createSymbolNode('b'), createSymbolNode('c')),
                    ),
                    testOptions,
                ),
            ).toBe('a >= (b | c)');
        });

        test('serialize greater or equals - chain', () => {
            expect(
                serialize(
                    createGreaterOrEquals(
                        createSymbolNode('a'),
                        createGreaterOrEquals(createSymbolNode('b'), createSymbolNode('c')),
                    ),
                    testOptions,
                ),
            ).toBe('a >= b >= c');
        });
    });
});

describe('serialze arithmetic nodes', () => {
    describe('serialize plus node', () => {
        test('serialize plus', () => {
            expect(serialize(createPlus(createSymbolNode('a'), createSymbolNode('b')), testOptions)).toBe('a + b');
        });

        test('serialize plus - brackets left', () => {
            expect(
                serialize(
                    createPlus(createOr(createSymbolNode('a'), createSymbolNode('b')), createSymbolNode('c')),
                    testOptions,
                ),
            ).toBe('(a | b) + c');
        });

        test('serialize plus - brackets right', () => {
            expect(
                serialize(
                    createPlus(createSymbolNode('a'), createOr(createSymbolNode('b'), createSymbolNode('c'))),
                    testOptions,
                ),
            ).toBe('a + (b | c)');
        });

        test('serialize plus - chain', () => {
            expect(
                serialize(
                    createPlus(createSymbolNode('a'), createPlus(createSymbolNode('b'), createSymbolNode('c'))),
                    testOptions,
                ),
            ).toBe('a + b + c');
        });
    });

    describe('serialize minus node', () => {
        test('serialize minus', () => {
            expect(serialize(createMinus(createSymbolNode('a'), createSymbolNode('b')), testOptions)).toBe('a - b');
        });

        test('serialize minus - no brackets left', () => {
            expect(
                serialize(
                    createMinus(createPlus(createSymbolNode('a'), createSymbolNode('b')), createSymbolNode('c')),
                    testOptions,
                ),
            ).toBe('a + b - c');
        });

        test('serialize minus - brackets right', () => {
            expect(
                serialize(
                    createMinus(createSymbolNode('a'), createPlus(createSymbolNode('b'), createSymbolNode('c'))),
                    testOptions,
                ),
            ).toBe('a - (b + c)');
        });

        test('serialize minus - chain right', () => {
            expect(
                serialize(
                    createMinus(createSymbolNode('a'), createMinus(createSymbolNode('b'), createSymbolNode('c'))),
                    testOptions,
                ),
            ).toBe('a - (b - c)');
        });

        test('serialize minus - chain left', () => {
            expect(
                serialize(
                    createMinus(createMinus(createSymbolNode('a'), createSymbolNode('b')), createSymbolNode('c')),
                    testOptions,
                ),
            ).toBe('a - b - c');
        });
    });

    describe('serialize times node', () => {
        test('serialize times', () => {
            expect(serialize(createTimes(createSymbolNode('a'), createSymbolNode('b')), testOptions)).toBe('a * b');
        });

        test('serialize times - left negative', () => {
            expect(serialize(createTimes(createNumberNode(-2), createNumberNode(3)), testOptions)).toBe('(-2) * 3');
        });

        test('serialize times - right negative', () => {
            expect(serialize(createTimes(createNumberNode(2), createNumberNode(-3)), testOptions)).toBe('2 * (-3)');
        });

        test('serialize times - brackets left', () => {
            expect(
                serialize(
                    createTimes(createPlus(createSymbolNode('a'), createSymbolNode('b')), createSymbolNode('c')),
                    testOptions,
                ),
            ).toBe('(a + b) * c');
        });

        test('serialize times - brackets right', () => {
            expect(
                serialize(
                    createTimes(createSymbolNode('a'), createPlus(createSymbolNode('b'), createSymbolNode('c'))),
                    testOptions,
                ),
            ).toBe('a * (b + c)');
        });

        test('serialize times - chain', () => {
            expect(
                serialize(
                    createTimes(createSymbolNode('a'), createTimes(createSymbolNode('b'), createSymbolNode('c'))),
                    testOptions,
                ),
            ).toBe('a * b * c');
        });
    });

    describe('serialize divided node', () => {
        test('serialize divided', () => {
            expect(serialize(createDivided(createSymbolNode('a'), createSymbolNode('b')), testOptions)).toBe('a / b');
        });

        test('serialize divided - left negative', () => {
            expect(serialize(createDivided(createNumberNode(-2), createNumberNode(3)), testOptions)).toBe('(-2) / 3');
        });

        test('serialize divided - right negative', () => {
            expect(serialize(createDivided(createNumberNode(2), createNumberNode(-3)), testOptions)).toBe('2 / (-3)');
        });

        test('serialize divided - brackets left', () => {
            expect(
                serialize(
                    createDivided(createPlus(createSymbolNode('a'), createSymbolNode('b')), createSymbolNode('c')),
                    testOptions,
                ),
            ).toBe('(a + b) / c');
        });

        test('serialize divided - brackets right', () => {
            expect(
                serialize(
                    createDivided(createSymbolNode('a'), createPlus(createSymbolNode('b'), createSymbolNode('c'))),
                    testOptions,
                ),
            ).toBe('a / (b + c)');
        });

        test('serialize divided - chain right', () => {
            expect(
                serialize(
                    createDivided(createSymbolNode('a'), createDivided(createSymbolNode('b'), createSymbolNode('c'))),
                    testOptions,
                ),
            ).toBe('a / (b / c)');
        });

        test('serialize divided - chain left', () => {
            expect(
                serialize(
                    createDivided(createDivided(createSymbolNode('a'), createSymbolNode('b')), createSymbolNode('c')),
                    testOptions,
                ),
            ).toBe('a / b / c');
        });
    });

    describe('serialize power node', () => {
        test('serialize power', () => {
            expect(serialize(createPower(createSymbolNode('a'), createSymbolNode('b')), testOptions)).toBe('a^b');
        });

        test('serialize power - left negative', () => {
            expect(serialize(createPower(createNumberNode(-2), createNumberNode(3)), testOptions)).toBe('(-2)^3');
        });

        test('serialize power - right negative', () => {
            expect(serialize(createPower(createNumberNode(2), createNumberNode(-3)), testOptions)).toBe('2^(-3)');
        });

        test('serialize power - brackets left', () => {
            expect(
                serialize(
                    createPower(createPlus(createSymbolNode('a'), createSymbolNode('b')), createSymbolNode('c')),
                    testOptions,
                ),
            ).toBe('(a + b)^c');
        });

        test('serialize power - brackets right', () => {
            expect(
                serialize(
                    createPower(createSymbolNode('a'), createPlus(createSymbolNode('b'), createSymbolNode('c'))),
                    testOptions,
                ),
            ).toBe('a^(b + c)');
        });

        test('serialize power - chain right', () => {
            expect(
                serialize(
                    createPower(createSymbolNode('a'), createPower(createSymbolNode('b'), createSymbolNode('c'))),
                    testOptions,
                ),
            ).toBe('a^(b^c)');
        });

        test('serialize power - chain left', () => {
            expect(
                serialize(
                    createPower(createPower(createSymbolNode('a'), createSymbolNode('b')), createSymbolNode('c')),
                    testOptions,
                ),
            ).toBe('(a^b)^c');
        });
    });
});

describe('serialize miscellaneous nodes', () => {
    test('serialize vector - empty', () => {
        expect(serialize(createVector([]), testOptions)).toBe('[]');
    });

    test('serialize vector', () => {
        expect(serialize(createVector([createNumberNode(1), createBooleanNode(false)]), testOptions)).toBe(
            '[1, false]',
        );
    });

    test('serialize function call - empty', () => {
        expect(serialize(createFunctionCall(createSymbolNode('bar'), []), testOptions)).toBe('bar()');
    });

    test('serialize function call - empty', () => {
        expect(
            serialize(
                createFunctionCall(createSymbolNode('foo'), [createNumberNode(42), createSymbolNode('x')]),
                testOptions,
            ),
        ).toBe('foo(42, x)');
    });

    test('serialize negate - no brackets', () => {
        expect(serialize(createNegate(createTimes(createSymbolNode('a'), createSymbolNode('b'))), testOptions)).toBe(
            '-a * b',
        );
    });

    test('serialize negate - brackets', () => {
        expect(serialize(createNegate(createPlus(createSymbolNode('a'), createSymbolNode('b'))), testOptions)).toBe(
            '-(a + b)',
        );
    });

    test('serialize negate in plus', () => {
        expect(serialize(createPlus(createNumberNode(42), createNegate(createNumberNode(12))), testOptions)).toBe(
            '42 + (-12)',
        );
    });

    test('serialize function', () => {
        expect(
            serialize(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                createFunction((_params) => createNumberNode(42), [], createNumberNode(42)),
                testOptions,
            ),
        ).toBe('() → 42');
    });
});

test('serialize unkown node type', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => serialize({ type: 'foo' }, testOptions)).toThrow();
});
