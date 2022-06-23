export function getSubmatrix(matrix: number[][], excludedRowIndex: number, excludedColumnIndex: number) {
    return matrix
        .filter((_, rowIndex) => rowIndex !== excludedRowIndex)
        .map((row) => row.filter((_, columnIndex) => columnIndex !== excludedColumnIndex));
}

export function replaceColumn(matrix: number[][], column: number[], index: number): number[][] {
    return matrix.map((row, rowIndex) =>
        row.map((item, columnIndex) => (columnIndex === index ? column[rowIndex] : item)),
    );
}
