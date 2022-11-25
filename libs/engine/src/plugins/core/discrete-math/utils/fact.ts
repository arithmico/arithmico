export function calculateFact(n: number) {
    if (n < 0) {
        throw 'RuntimeError: fact: n < 0';
    }

    if (n % 1 !== 0) {
        throw 'RuntimeError: fact: n is not an integer';
    }

    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}
