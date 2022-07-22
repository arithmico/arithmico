export function calculateMedian(xs: number[]): number {
    const array: number[] = xs.slice(0).sort();
    const size = array.length;
    return size % 2 === 0 ? (array[size / 2 - 1] + array[size / 2]) / 2 : array[Math.floor(size / 2)];
}