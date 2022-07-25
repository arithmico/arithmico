import { SyntaxTreeNode } from '../../types/SyntaxTreeNodes';
import { getPolynomial } from '../../utils/polynomial-syntax-tree-utils';
import normalize from '../../normalize';
import { createOptions, defaultOptions } from '../../utils/context-utils';
import { Context, Options } from '../../types/Context';

const testOptions = createOptions();

const testContext: Context = {
    options: testOptions,
    stack: [{}],
};


test('getPolynomial() 2*x^3', () => {
    expect(
        getPolynomial(<SyntaxTreeNode>{
            type: 'times',
            left: {
                type: 'number',
                value: 2,
            },
            right: {
                type: 'power',
                left: {
                    type: 'symbol',
                    name: 'x',
                },
                right: {
                    type: 'number',
                    value: 3,
                },
            },
        }),
    ).toStrictEqual([{ coefficient: 2, base: 'x', degree: 3 }]);
});

test('getPolynomial() 2*x^3 + 4*x^2', () => {
    expect(
        getPolynomial(<SyntaxTreeNode>{
            type: 'plus',
            left: {
                type: 'times',
                left: {
                    type: 'number',
                    value: 2,
                },
                right: {
                    type: 'power',
                    left: {
                        type: 'symbol',
                        name: 'x',
                    },
                    right: {
                        type: 'number',
                        value: 3,
                    },
                },
            },
            right: {
                type: 'times',
                left: {
                    type: 'number',
                    value: 4,
                },
                right: {
                    type: 'power',
                    left: {
                        type: 'symbol',
                        name: 'x',
                    },
                    right: {
                        type: 'number',
                        value: 2,
                    },
                },
            },
        }),
    ).toStrictEqual([
        { coefficient: 2, base: 'x', degree: 3 },
        { coefficient: 4, base: 'x', degree: 2 },
    ]);
});

test('getPolynomial() 2*x^3 + 4*y^2', () => {
    expect(
        getPolynomial(<SyntaxTreeNode>{
            type: 'plus',
            left: {
                type: 'times',
                left: {
                    type: 'number',
                    value: 2,
                },
                right: {
                    type: 'power',
                    left: {
                        type: 'symbol',
                        name: 'x',
                    },
                    right: {
                        type: 'number',
                        value: 3,
                    },
                },
            },
            right: {
                type: 'times',
                left: {
                    type: 'number',
                    value: 4,
                },
                right: {
                    type: 'power',
                    left: {
                        type: 'symbol',
                        name: 'y',
                    },
                    right: {
                        type: 'number',
                        value: 2,
                    },
                },
            },
        }),
    ).toStrictEqual([
        { coefficient: 2, base: 'x', degree: 3 },
        { coefficient: 4, base: 'y', degree: 2 },
    ]);
});

test('getPolynomial() -2*x^3', () => {
    expect(
        getPolynomial(
            normalize(
                <SyntaxTreeNode>{
                    type: 'times',
                    left: {
                        type: 'negate',
                        value: {
                            type: 'number',
                            value: 2,
                        },
                    },
                    right: {
                        type: 'power',
                        left: {
                            type: 'symbol',
                            name: 'x',
                        },
                        right: {
                            type: 'number',
                            value: 3,
                        },
                    },
                },
                testContext,
            ),
        ),
    ).toStrictEqual([{ coefficient: -2, base: 'x', degree: 3 }]);
});

test('getPolynomial() 2*x^3 - 4*x^2', () => {
    expect(
        getPolynomial(
            normalize(
                <SyntaxTreeNode>{
                    type: 'minus',
                    left: {
                        type: 'times',
                        left: {
                            type: 'number',
                            value: 2,
                        },
                        right: {
                            type: 'power',
                            left: {
                                type: 'symbol',
                                name: 'x',
                            },
                            right: {
                                type: 'number',
                                value: 3,
                            },
                        },
                    },
                    right: {
                        type: 'times',
                        left: {
                            type: 'number',
                            value: 4,
                        },
                        right: {
                            type: 'power',
                            left: {
                                type: 'symbol',
                                name: 'x',
                            },
                            right: {
                                type: 'number',
                                value: 2,
                            },
                        },
                    },
                },
                testContext,
            ),
        ),
    ).toStrictEqual([
        { coefficient: 2, base: 'x', degree: 3 },
        { coefficient: -4, base: 'x', degree: 2 },
    ]);
});


test('getPolynomial() 2*x', () => {
    expect(
        getPolynomial(
            normalize(
                <SyntaxTreeNode>{
                    type: 'times',
                    left: {
                        type: 'number',
                        value: 2,
                    },
                    right: {
                        type: 'symbol',
                        name: 'x',
                    },
                },
                testContext,
            ),
        ),
    ).toStrictEqual([{ coefficient: 2, base: 'x', degree: 1 }]);
});

test('getPolynomial() 2', () => {
    expect(
        getPolynomial(
            normalize(
                <SyntaxTreeNode>{
                    type: 'number',
                    value: 2,
                },
                testContext,
            ),
        ),
    ).toStrictEqual([{ coefficient: 2, base: '', degree: 0 }]);
});
