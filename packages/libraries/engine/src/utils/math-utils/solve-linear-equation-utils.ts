import { createZeroMatrix, getColumn, multiplyMatrixVector, scalarMultiplication, transpose } from './matrix-utils';

/*
reference: Chunawala, Quasar (2023). Fast Algorithms for Solving a System of Linear Equations. https://www.baeldung.com/cs/solving-system-linear-equations. Last updated: 06-13-2023.
following code is inspired by algorithms
 */

// Algorithm 5: QR Decomposition
export function calculateQRFactorization(matrixA: number[][]): [number[][], number[][]] {
    const n = matrixA.length;
    const matrixU = createZeroMatrix(n, n);
    const matrixR = createZeroMatrix(n, n);

    for (let j = 0; j < n - 1; j++) {
        const w_j = getColumn(j, matrixA);

        // Squared norm of w_j
        let sumNormOfW = 0;
        for (let k = 0; k < n; k++) {
            sumNormOfW += w_j[k] * w_j[k];
        }

        // Compute the coefficients of R[i][j]
        let sumCoefficientsOfR = 0;
        for (let i = 0; i < j; i++) {
            const value = scalarMultiplication(w_j, matrixU[i]);
            matrixR[i][j] = value;
            sumCoefficientsOfR += value * value;
        }
        matrixR[j][j] = Math.sqrt(sumNormOfW - sumCoefficientsOfR);

        // Compute vector u[j] using fwd substitution
        let sumvec = new Array(n).fill(0);
        for (let i = 0; i < j; i++) {
            const valueOfR = matrixR[i][j];
            sumvec = sumvec.map((_, index) => sumvec[index] + valueOfR * matrixU[i][index]);
        }
        matrixU[j] = w_j.map((_, index) => (w_j[index] - sumvec[index]) / matrixR[j][j]);
    }

    const matrixQ = transpose(matrixU);
    return [matrixQ, matrixR];
}

export function solveWithBackSubstitution(upperTriangleMatrix: number[][], coefficients: number[]) {
    const n = coefficients.length;
    const result: number[] = new Array(n).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i; j < n; j++) {
            sum += result[j] * upperTriangleMatrix[i][j];
        }
        result[i] = (coefficients[i] - sum) / upperTriangleMatrix[i][i];
    }
    return result;
}

export function qrDecompositionSolver(coefficients: number[][], constants: number[]): number[] {
    const [orthonormalMatrix, upperTriangleMatrix] = calculateQRFactorization(coefficients);
    const modifiedConstants = multiplyMatrixVector(transpose(orthonormalMatrix), constants);

    return solveWithBackSubstitution(upperTriangleMatrix, modifiedConstants);
}
