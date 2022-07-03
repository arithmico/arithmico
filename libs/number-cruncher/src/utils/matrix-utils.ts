import { NumberNode, Vector } from '../types/SyntaxTreeNodes';
import { REFUSED } from 'dns';

export function getSubMatrix(matrix: number[][], excludedRowIndex: number, excludedColumnIndex: number) {
    return matrix
        .filter((_, rowIndex) => rowIndex !== excludedRowIndex)
        .map((row) => row.filter((_, columnIndex) => columnIndex !== excludedColumnIndex));
}

export function det(matrix: number[][]): number {
    if (matrix.length === 1 && matrix[0].length === 1) {
        return matrix[0][0];
    }

    return matrix
        .map((_, i) => Math.pow(-1, i + 2) * matrix[i][0] * det(getSubMatrix(matrix, i, 0)))
        .reduce((a, b) => a + b);
}

export function replaceColumn(matrix: number[][], column: number[], index: number): number[][] {
    return matrix.map((row, rowIndex) =>
        row.map((item, columnIndex) => (columnIndex === index ? column[rowIndex] : item)),
    );
}

export function cramerSolver(coefficients: number[][], constants: number[], coefficientsDet: number) {
    const results: number[] = [];
    for (let i = 0; i < coefficients.length; i++) {
        const value = det(replaceColumn(coefficients, constants, i)) / coefficientsDet;
        results.push(value);
    }
    return results;
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
