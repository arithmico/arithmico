function getNumbersFrom2ToN(n: number) {
    return new Array(n - 1).fill(0).map((_, index) => index + 2);
}

export function sieveOfAtkin(n: number) {
    const primes: number[] = [];
    if (n >= 2) {
        primes.push(2);
    }
    if (n >= 3) {
        primes.push(3);
    }
    if (n >= 5) {
        primes.push(5);
    }

    if (n < 7) {
        return primes;
    }

    const primeCandidates = new Array(n).fill(false);
    const loopEnd = Math.sqrt(n);

    const set1 = new Set([1, 13, 17, 29, 37, 41, 49, 53]);
    for (let x = 1; x <= loopEnd; x++) {
        for (let y = 1; y <= loopEnd; y += 2) {
            const m = 4 * x * x + y * y;
            if (set1.has(m % 60) && m <= n) {
                primeCandidates[m] = !primeCandidates[m];
            }
        }
    }

    const set2 = new Set([7, 19, 31, 43]);
    for (let x = 1; x <= loopEnd; x += 2) {
        for (let y = 2; y <= loopEnd; y += 2) {
            const m = 3 * x * x + y * y;
            if (set2.has(m % 60) && m <= n) {
                primeCandidates[m] = !primeCandidates[m];
            }
        }
    }

    const set3 = new Set([11, 23, 47, 59]);
    for (let x = 2; x <= loopEnd; x++) {
        for (let y = x - 1; 1 <= y; y -= 2) {
            const m = 3 * x * x - y * y;
            if (set3.has(m % 60) && m <= n) {
                primeCandidates[m] = !primeCandidates[m];
            }
        }
    }

    const loopEnd2 = n / 60 + 59;
    for (let m = 0; m <= loopEnd2; m++) {
        const squaredM = m * m;
        if (squaredM > n) {
            break;
        }
        if (primeCandidates[m]) {
            for (let m2 = 0; m2 <= loopEnd2; m2++) {
                const cubedM = squaredM * m2;
                if (cubedM > n) {
                    break;
                }
                primeCandidates[cubedM] = false;
            }
        }
    }

    primeCandidates.forEach((isPrime, index) => {
        if (isPrime) {
            primes.push(index);
        }
    });
    return primes;
}

export function getNthPrimeNumber(n: number) {
    let primes = sieveOfAtkin(n);
    for (let sizeFactor = 2; primes.length <= n; sizeFactor++) {
        primes = sieveOfAtkin(sizeFactor * n);
    }
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
