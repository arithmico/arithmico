export function calculateFactorial(n: number) {
    if (n < 0) {
        throw 'RuntimeError: factorial: Value must not be smaller than 0.';
    }

    if (n % 1 !== 0) {
        throw 'RuntimeError: factorial: Value is not an integer';
    }

    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}
