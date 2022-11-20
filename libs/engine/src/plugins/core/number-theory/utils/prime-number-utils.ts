import { valid } from 'overlayscrollbars';

function getNumbersFrom2ToN(n: number) {
    return new Array(n - 1).fill(0).map((_, index) => index + 2);
}

export function sieveOfAtkin(n: number) {
    const s = [1, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 49, 53, 59];
    const a = new Array(n).fill(false);
    const loopEnd = Math.sqrt(n);

    for (let x = 1; x < loopEnd; x++) {
        for (let y = 0; y < loopEnd; y += 2) {
            const m = 4 * x ** 2 + y ** 2;
            if (new Set([1, 13, 17, 29, 37, 41, 49, 53]).has(m % 60) && m <= n) {
                a[m] = !a[m];
            }
        }
    }

    for (let x = 1; x < loopEnd; x += 2) {
        for (let y = 2; y < loopEnd; y += 2) {
            const m = 3 * x ** 2 + y ** 2;
            if (new Set([7, 19, 31, 43]).has(m % 60) && m <= n) {
                a[m] = !a[m];
            }
        }
    }

    for (let x = 2; x < loopEnd; x++) {
        for (let y = x - 1; y > 1; y -= 2) {
            const m = 3 * x ** 2 - y ** 2;
            if (new Set([11, 23, 47, 59]).has(m % 60) && m <= n) {
                a[m] = !a[m];
            }
        }
    }

    const temp: Set<number> = new Set();
    new Array(Math.floor(n / 60))
        .fill(0)
        .map((_, index) => 60 * index)
        .forEach((value) => s.forEach((sValue) => M.add(value + sValue)));
    const M = new Set(Array.from(temp).sort((a, b) => a - b));

    M.delete(1);
    for (const m of M) {
        if (m ** 2 > n) {
            break;
        }
        const mm = m ** 2;
        if (a[m]) {
            for (const m2 of M) {
                const c = mm * m2;
                if (c > n) {
                    break;
                }
                a[c] = false;
            }
        }
    }
    const primes = [2, 3, 5];
    return primes.concat(
        a.reduce(
            (a, b, currentIndex) =>
                function (filtered: number[], value: boolean) {
                    if (value) {
                        filtered.push(currentIndex);
                    }
                    return filtered;
                },
            [],
        ),
    );
}

function sieveOfEratosthenes(n: number) {
    const numbers = getNumbersFrom2ToN(n);
    let reversedNumbers = [...numbers].reverse();
    const result: number[] = [];

    for (let i = 0; i < numbers.length; i++) {
        const primeNumber = reversedNumbers.pop();
        result.push(primeNumber);
        if (primeNumber << 1 > n) {
            return result.concat(reversedNumbers).sort((a, b) => a - b);
        }
        reversedNumbers = reversedNumbers.filter((value) => value % primeNumber !== 0);
    }
}

export function getNthPrimeNumber(n: number) {
    let sizeFactor = 2;
    let primes;
    do {
        primes = sieveOfAtkin(sizeFactor * n);
        sizeFactor++;
    } while (primes.length <= n);
    return primes[n - 1];
}

export function isPrimeNumber(number: number) {
    if (number % 1 !== 0 || number < 2) {
        return false;
    }
    const numbers = getNumbersFrom2ToN(number);
    numbers.pop();
    return !numbers.some((value) => number % value === 0);
}
