import { det } from '../../utils/calculate-det';

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
