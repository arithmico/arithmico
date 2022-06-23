import { getSubmatrix } from './matrix-utils';

export function det(matrix: number[][]): number {
    if (matrix.length === 1 && matrix[0].length === 1) {
        return matrix[0][0];
    }

    return matrix
        .map((_, i) => Math.pow(-1, i + 2) * matrix[i][0] * det(getSubmatrix(matrix, i, 0)))
        .reduce((a, b) => a + b);
}
