import { SyntaxTreeNode } from '../../types/SyntaxTreeNodes';
import { getPolynomial } from '../../utils/polynomial-syntax-tree-utils';
import normalize from '../../normalize';
import { createOptions } from '../../utils/context-utils';
import { Context } from '../../types/Context';

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
    ).toStrictEqual([{ type: 'monomial', coefficient: 2, base: 'x', degree: 3 }]);
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
        { type: 'monomial', coefficient: 2, base: 'x', degree: 3 },
        { type: 'monomial', coefficient: 4, base: 'x', degree: 2 },
    ]);
});

test('getPolynomial() x^2', () => {
    expect(
        getPolynomial(
            normalize(
                <SyntaxTreeNode>{
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
                testContext,
            ),
        ),
    ).toStrictEqual([{ type: 'monomial', coefficient: 1, base: 'x', degree: 2 }]);
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
        { type: 'monomial', coefficient: 2, base: 'x', degree: 3 },
        { type: 'monomial', coefficient: 4, base: 'y', degree: 2 },
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
    ).toStrictEqual([{ type: 'monomial', coefficient: -2, base: 'x', degree: 3 }]);
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
        { type: 'monomial', coefficient: 2, base: 'x', degree: 3 },
        { type: 'monomial', coefficient: -4, base: 'x', degree: 2 },
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
    ).toStrictEqual([{ type: 'monomial', coefficient: 2, base: 'x', degree: 1 }]);
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
    ).toStrictEqual([{ type: 'constant', coefficient: 2 }]);
});

test('getPolynomial() x', () => {
    expect(
        getPolynomial(
            normalize(
                <SyntaxTreeNode>{
                    type: 'symbol',
                    name: 'x',
                },
                testContext,
            ),
        ),
    ).toStrictEqual([{ type: 'monomial', coefficient: 1, base: 'x', degree: 1 }]);
});

test('getPolynomial() 2 + x^0', () => {
    expect(
        getPolynomial(
            normalize(
                <SyntaxTreeNode>{
                    type: 'plus',
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
                            value: 0,
                        },
                    },
                },
                testContext,
            ),
        ),
    ).toStrictEqual([{ type: 'constant', coefficient: 3 }]);
});

// 2*x^2 + x + 4
test('getPolynomial() 2*x^2 + x + 4', () => {
    expect(
        getPolynomial(
            normalize(
                <SyntaxTreeNode>{
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
                                value: 2,
                            },
                        },
                    },
                    right: {
                        type: 'plus',
                        left: {
                            type: 'symbol',
                            name: 'x',
                        },
                        right: {
                            type: 'number',
                            value: 4,
                        },
                    },
                },
                testContext,
            ),
        ),
    ).toStrictEqual([
        { type: 'monomial', coefficient: 2, base: 'x', degree: 2 },
        { type: 'monomial', coefficient: 1, base: 'x', degree: 1 },
        { type: 'constant', coefficient: 4 },
    ]);
});

test('getPolynomial() 4*x^5 - x^0 + 4*y^4 - 6*x^3 + 3*x^1 - x + 3', () => {
    expect(
        getPolynomial(
            normalize(
                <SyntaxTreeNode>{
                    type: 'plus',
                    left: {
                        type: 'minus',
                        left: {
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
                                    value: 5,
                                },
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
                                value: 0,
                            },
                        },
                    },
                    right: {
                        type: 'plus',
                        left: {
                            type: 'minus',
                            left: {
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
                                        value: 4,
                                    },
                                },
                            },
                            right: {
                                type: 'times',
                                left: {
                                    type: 'number',
                                    value: 6,
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
                        },
                        right: {
                            type: 'plus',
                            left: {
                                type: 'minus',
                                left: {
                                    type: 'times',
                                    left: {
                                        type: 'number',
                                        value: 3,
                                    },
                                    right: {
                                        type: 'power',
                                        left: {
                                            type: 'symbol',
                                            name: 'x',
                                        },
                                        right: {
                                            type: 'number',
                                            value: 1,
                                        },
                                    },
                                },
                                right: {
                                    type: 'symbol',
                                    name: 'x',
                                },
                            },
                            right: {
                                type: 'number',
                                value: 3,
                            },
                        },
                    },
                },
                testContext,
            ),
        ),
        // 4*x^5 - x^0 + 4*y^4 - 6*x^3 + 3*x^1 - x + 3
    ).toStrictEqual([
        { type: 'monomial', coefficient: 4, base: 'x', degree: 5 },
        { type: 'monomial', coefficient: 4, base: 'y', degree: 4 },
        { type: 'monomial', coefficient: -6, base: 'x', degree: 3 },
        { type: 'monomial', coefficient: 2, base: 'x', degree: 1 },
        { type: 'constant', coefficient: 2 },
    ]);
});
