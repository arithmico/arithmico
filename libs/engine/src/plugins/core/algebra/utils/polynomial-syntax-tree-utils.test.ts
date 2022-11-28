import { getPolynomial } from './polynomial-syntax-tree-utils';
import normalize from '../../../../normalize';
import { createOptions } from '../../../../utils/context-utils';
import { Context } from '../../../../types/Context';
import createNumberNode from '../../../../create/create-number-node';
import createNegate from '../../../../create/create-negate';
import createPlus from '../../../../create/create-plus';
import createPower from '../../../../create/create-power';
import createSymbolNode from '../../../../create/create-symbol-node';
import createTimes from '../../../../create/create-times';
import createMinus from '../../../../create/create-minus';
import { createConstantMonomial, createNonConstantMonomial } from './polynomial-type-utils';

const testOptions = createOptions();

const testContext: Context = {
    options: testOptions,
    stack: [new Map()],
};

test('getPolynomial() 2', () => {
    expect(getPolynomial(normalize(createNumberNode(2), testContext))).toStrictEqual([createConstantMonomial(2)]);
});

test('getPolynomial() -2', () => {
    expect(getPolynomial(normalize(createNegate(createNumberNode(2)), testContext))).toStrictEqual([
        createConstantMonomial(-2),
    ]);
});

test('getPolynomial() 2 + x^0', () => {
    expect(
        getPolynomial(
            normalize(
                createPlus(createNumberNode(2), createPower(createSymbolNode('x'), createNumberNode(0))),
                testContext,
            ),
        ),
    ).toStrictEqual([createConstantMonomial(3)]);
});

test('getPolynomial() x', () => {
    expect(getPolynomial(normalize(createSymbolNode('x'), testContext))).toStrictEqual([
        createNonConstantMonomial(1, 'x', 1),
    ]);
});

test('getPolynomial() -x', () => {
    expect(getPolynomial(normalize(createNegate(createSymbolNode('x')), testContext))).toStrictEqual([
        createNonConstantMonomial(-1, 'x', 1),
    ]);
});

test('getPolynomial() 2*x', () => {
    expect(
        getPolynomial(normalize(createTimes(createNumberNode(2), createSymbolNode('x')), testContext)),
    ).toStrictEqual([createNonConstantMonomial(2, 'x', 1)]);
});

test('getPolynomial() x^2', () => {
    expect(
        getPolynomial(normalize(createPower(createSymbolNode('x'), createNumberNode(2)), testContext)),
    ).toStrictEqual([createNonConstantMonomial(1, 'x', 2)]);
});

test('getPolynomial() -x^2', () => {
    expect(
        getPolynomial(normalize(createNegate(createPower(createSymbolNode('x'), createNumberNode(2))), testContext)),
    ).toStrictEqual([createNonConstantMonomial(-1, 'x', 2)]);
});

test('getPolynomial() 2*x^3', () => {
    expect(
        getPolynomial(createTimes(createNumberNode(2), createPower(createSymbolNode('x'), createNumberNode(3)))),
    ).toStrictEqual([createNonConstantMonomial(2, 'x', 3)]);
});

test('getPolynomial() -2*x^3', () => {
    expect(
        getPolynomial(
            normalize(
                createNegate(createTimes(createNumberNode(2), createPower(createSymbolNode('x'), createNumberNode(3)))),
                testContext,
            ),
        ),
    ).toStrictEqual([createNonConstantMonomial(-2, 'x', 3)]);
});

test('getPolynomial() 2*x^3 + 4*x^2', () => {
    expect(
        getPolynomial(
            createPlus(
                createTimes(createNumberNode(2), createPower(createSymbolNode('x'), createNumberNode(3))),
                createTimes(createNumberNode(4), createPower(createSymbolNode('x'), createNumberNode(2))),
            ),
        ),
    ).toStrictEqual([createNonConstantMonomial(2, 'x', 3), createNonConstantMonomial(4, 'x', 2)]);
});

test('getPolynomial() 2*x^3 + 4*y^2', () => {
    expect(
        getPolynomial(
            createPlus(
                createTimes(createNumberNode(2), createPower(createSymbolNode('x'), createNumberNode(3))),
                createTimes(createNumberNode(4), createPower(createSymbolNode('y'), createNumberNode(2))),
            ),
        ),
    ).toStrictEqual([createNonConstantMonomial(2, 'x', 3), createNonConstantMonomial(4, 'y', 2)]);
});

test('getPolynomial() 2*x^3 - 4*x^2', () => {
    expect(
        getPolynomial(
            normalize(
                createMinus(
                    createTimes(createNumberNode(2), createPower(createSymbolNode('x'), createNumberNode(3))),
                    createTimes(createNumberNode(4), createPower(createSymbolNode('x'), createNumberNode(2))),
                ),
                testContext,
            ),
        ),
    ).toStrictEqual([createNonConstantMonomial(2, 'x', 3), createNonConstantMonomial(-4, 'x', 2)]);
});

test('getPolynomial() 2*x^2 + x + 4', () => {
    expect(
        getPolynomial(
            normalize(
                createPlus(
                    createTimes(createNumberNode(2), createPower(createSymbolNode('x'), createNumberNode(2))),
                    createPlus(createSymbolNode('x'), createNumberNode(4)),
                ),
                testContext,
            ),
        ),
    ).toStrictEqual([
        createNonConstantMonomial(2, 'x', 2),
        createNonConstantMonomial(1, 'x', 1),
        createConstantMonomial(4),
    ]);
});

test('getPolynomial() 4*x^5 - x^0 + 4*y^4 - 6*x^3 + 3*x^1 - x + 3', () => {
    expect(
        getPolynomial(
            normalize(
                createPlus(
                    createMinus(
                        createTimes(createNumberNode(4), createPower(createSymbolNode('x'), createNumberNode(5))),
                        createPower(createSymbolNode('x'), createNumberNode(0)),
                    ),
                    createPlus(
                        createMinus(
                            createTimes(createNumberNode(4), createPower(createSymbolNode('y'), createNumberNode(4))),
                            createTimes(createNumberNode(6), createPower(createSymbolNode('x'), createNumberNode(3))),
                        ),
                        createPlus(
                            createMinus(
                                createTimes(
                                    createNumberNode(3),
                                    createPower(createSymbolNode('x'), createNumberNode(1)),
                                ),
                                createSymbolNode('x'),
                            ),
                            createNumberNode(3),
                        ),
                    ),
                ),
                testContext,
            ),
        ),
    ).toStrictEqual([
        createNonConstantMonomial(4, 'x', 5),
        createNonConstantMonomial(4, 'y', 4),
        createNonConstantMonomial(-6, 'x', 3),
        createNonConstantMonomial(2, 'x', 1),
        createConstantMonomial(2),
    ]);
});
