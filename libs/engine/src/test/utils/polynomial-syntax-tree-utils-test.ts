import { SyntaxTreeNode } from '../../types/SyntaxTreeNodes';
import { getPolynomial } from '../../utils/polynomial-syntax-tree-utils';

// parsed node = 3*x^3 + 2*x^2 - 2*x^1 + 4
const node: SyntaxTreeNode = {
    type: 'plus',
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
                value: 3,
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
                        value: 1,
                    },
                },
            },
        },
        right: {
            type: 'number',
            value: 4,
        },
    },
};

test('getPolynomial()', () => {
    expect(getPolynomial(node)).toStrictEqual(
        // 3*x^3 + 2*x^2 - 2*x^1 + 4;
        [
            { coefficient: 3, base: 'x', degree: 3 },
            { coefficient: 2, base: 'x', degree: 2 },
            { coefficient: -2, base: 'x', degree: 1 },
            { coefficient: 4, base: 'x', degree: 0 },
        ],
    );
});
