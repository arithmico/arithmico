import {NumberNode, Vector} from '../../../types/nodes.types';

function det2x2(matrix: number[][]): number {
    return matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
}

function det3x3(matrix: number[][]): number {
    return (
        matrix[0][0] * matrix[1][1] * matrix[2][2] +
        matrix[0][1] * matrix[1][2] * matrix[2][0] +
        matrix[0][2] * matrix[1][0] * matrix[2][1] -
        matrix[0][2] * matrix[1][1] * matrix[2][0] -
        matrix[0][0] * matrix[1][2] * matrix[2][1] -
        matrix[0][1] * matrix[1][0] * matrix[2][2]
    );
}

export function getSubMatrix(matrix: number[][], excludedRowIndex: number, excludedColumnIndex: number) {
    return matrix
        .filter((_, rowIndex) => rowIndex !== excludedRowIndex)
        .map((row) => row.filter((_, columnIndex) => columnIndex !== excludedColumnIndex));
}

export function det(matrix: number[][]): number {
    switch (matrix.length) {
        case 3:
            return det3x3(matrix);
        case 2:
            return det2x2(matrix);
        case 1:
            return matrix[0][0];
        default:
            return matrix
                .map((_, i) => Math.pow(-1, i + 2) * matrix[i][0] * det(getSubMatrix(matrix, i, 0)))
                .reduce((a, b) => a + b);
    }
}

export function replaceColumn(matrix: number[][], column: number[], index: number): number[][] {
    return matrix.map((row, rowIndex) =>
        row.map((item, columnIndex) => (columnIndex === index ? column[rowIndex] : item)),
    );
}

export function createIdentityMatrix(n: number): number[][] {
    return new Array<number[]>(n)
        .fill(new Array(n).fill(0))
        .map((line, lineIndex) => line.map((value, columnIndex) => (lineIndex === columnIndex ? 1 : 0)));
}

export function tensorToMatrix(tensor: Vector): number[][] {
    return tensor.values.map((element) => (<Vector>element).values.map((e) => (<NumberNode>e).value));
}

export function getColumn(columnIndex: number, matrix: number[][]): number[] {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
        result.push(matrix[i][columnIndex]);
    }
    return result;
}

export function addColumn(column: number[], matrix: number[][]): number[][] {
    const result = matrix.map((row) => row.slice());
    for (let i = 0; i < matrix.length; i++) {
        result[i].push(column[i]);
    }
    return result;
}

export function transpose(matrix: number[][]): number[][] {
    const result = [];
    for (let i = 0; i < matrix[0].length; i++) {
        result.push(getColumn(i, matrix));
    }
    return result;
}

export function calculateCofactorMatrix(matrix: number[][]): number[][] {
    return matrix.map((row, i) =>
        row.map((column, j) => ((i + j) % 2 === 0 ? 1 : -1) * det(getSubMatrix(matrix, i, j))),
    );
}
