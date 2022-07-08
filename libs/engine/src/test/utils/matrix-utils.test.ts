import { addColumn, det, getColumn, getSubMatrix } from '../../utils/matrix-utils';

test('1x1 det', () => {
    expect(det([[7]])).toBe(7);
});

test('2x2 det #1', () => {
    expect(
        det([
            [1, 0],
            [0, 1],
        ]),
    ).toBe(1);
});

test('2x2 det #2', () => {
    expect(
        det([
            [1, 2],
            [3, 4],
        ]),
    ).toBe(-2);
});

test('2x2 det #3', () => {
    expect(
        det([
            [3, -2],
            [6, -4],
        ]),
    ).toBe(0);
});

test('getSubMatrix #1', () => {
    expect(
        getSubMatrix(
            [
                [3, -2],
                [6, -4],
            ],
            0,
            0,
        ),
    ).toStrictEqual([[-4]]);
});

test('getColumn #1', () => {
    expect(
        getColumn(0, [
            [3, -2],
            [6, -4],
        ]),
    ).toStrictEqual([3, 6]);
});

test('addColumn #1', () => {
    expect(
        addColumn(
            [1, 2],
            [
                [3, -2],
                [6, -4],
            ],
        ),
    ).toStrictEqual([
        [3, -2, 1],
        [6, -4, 2],
    ]);
});

test('addColumn #2', () => {
    expect(addColumn([1, 2], [[], []])).toStrictEqual([[1], [2]]);
});
