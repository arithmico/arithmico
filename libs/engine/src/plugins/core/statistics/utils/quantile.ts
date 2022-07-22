export function calculateQuantile(p: number, xs: number[]): number {
    const arr: number[] = xs.slice(0).sort((a, b) => a - b);
    const expectedValue: number = arr.length * p;

    const leftIndex = Math.floor(expectedValue) - 1;
    const rightIndex = Math.ceil(expectedValue) - 1;
    const leftValue = arr[leftIndex];
    const rightValue = arr[rightIndex];
    const coefficient = rightIndex === leftIndex ? 0 : (rightValue - leftValue) / (rightIndex - leftIndex);

    return leftValue + coefficient * (expectedValue - leftValue);
    //return leftValue + coefficient * (rightValue - leftValue);

    /*
    if (expectedValue % 1 === 0) {
        return (arr[expectedValue - 1] + arr[expectedValue]) / 2;
    } else {
        return arr[Math.floor(expectedValue)] + ;
    }

    expectedValue % 1 === 0
        ? (arr[expectedValue / 2] + arr[expectedValue / 2 + 1]) / 2
        : arr[Math.floor(expectedValue + 1)];
     */
}
