import createBooleanNode from '../../create/BooleanNode';
import createNumberNode from '../../create/NumberNode';
import createVector from '../../create/Vector';
import { getShape, getVectorDimensions, getVectorRank, isVectorHomogeneous } from '../../utils/vector-utils';

test('get vector shape (1d)', () => {
    const vector = createVector([createNumberNode(1), createNumberNode(2), createNumberNode(3)]);
    expect(getShape(vector)).toStrictEqual(3);
});

test('get vector shape (inhomogeneous)', () => {
    const vector = createVector([createVector([createNumberNode(1), createNumberNode(2)]), createBooleanNode(false)]);
    expect(getShape(vector)).toStrictEqual([2, 1]);
});

test('get vector rank - throw', () => {
    const vector = createVector([createVector([createNumberNode(1), createNumberNode(2)]), createBooleanNode(false)]);
    expect(() => getVectorRank(vector)).toThrow();
});

test('get vector rank = 1', () => {
    const vector = createVector([createNumberNode(1), createNumberNode(2), createBooleanNode(false)]);
    expect(getVectorRank(vector)).toStrictEqual(1);
});

test('get vector rank = 2', () => {
    const vector = createVector([
        createVector([createNumberNode(1), createNumberNode(2)]),
        createVector([createNumberNode(3), createNumberNode(4)]),
        createVector([createNumberNode(5), createNumberNode(6)]),
    ]);
    expect(getVectorRank(vector)).toStrictEqual(2);
});

test('get vector dimensions - throw', () => {
    const vector = createVector([createVector([createNumberNode(1), createNumberNode(2)]), createBooleanNode(false)]);
    expect(() => getVectorDimensions(vector)).toThrow();
});

test('get vector dimensions (1d)', () => {
    const vector = createVector([createNumberNode(1), createNumberNode(2), createBooleanNode(false)]);
    expect(getVectorDimensions(vector)).toStrictEqual([3]);
});

test('get vector dimensions (2d)', () => {
    const vector = createVector([
        createVector([createNumberNode(1), createNumberNode(2)]),
        createVector([createNumberNode(3), createNumberNode(4)]),
        createVector([createNumberNode(5), createNumberNode(6)]),
    ]);
    expect(getVectorDimensions(vector)).toStrictEqual([3, 2]);
});

test('is vector shape homogeneous - true (1d)', () => {
    const vector = createVector([createNumberNode(1), createNumberNode(2), createBooleanNode(false)]);
    expect(isVectorHomogeneous(vector)).toStrictEqual(true);
});

test('is vector shape homogeneous - true (2d)"', () => {
    const vector = createVector([
        createVector([createNumberNode(1), createNumberNode(2)]),
        createVector([createNumberNode(3), createNumberNode(4)]),
        createVector([createNumberNode(5), createNumberNode(6)]),
    ]);
    expect(isVectorHomogeneous(vector)).toStrictEqual(true);
});

test('is vector shape homogeneous - false (different child ranks)', () => {
    const vector = createVector([createVector([createNumberNode(1), createNumberNode(2)]), createBooleanNode(false)]);
    expect(isVectorHomogeneous(vector)).toStrictEqual(false);
});

test('is vector shape homogeneous - false (different child shapes)"', () => {
    const vector = createVector([
        createVector([createNumberNode(1), createNumberNode(2)]),
        createVector([createNumberNode(3), createNumberNode(4)]),
        createVector([createNumberNode(5), createNumberNode(6), createNumberNode(7)]),
    ]);
    expect(isVectorHomogeneous(vector)).toStrictEqual(false);
});

test('is vector shape homogeneous - false (inhomogeneous child)"', () => {
    const vector = createVector([
        createVector([createNumberNode(1), createNumberNode(2)]),
        createVector([createNumberNode(3), createNumberNode(4)]),
        createVector([createVector([createNumberNode(5), createNumberNode(6)]), createNumberNode(7)]),
    ]);
    expect(isVectorHomogeneous(vector)).toStrictEqual(false);
});
