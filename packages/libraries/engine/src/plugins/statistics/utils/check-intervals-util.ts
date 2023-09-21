export function isInClosedInterval(x: number, lowerBound: number, upperBound: number) {
    return lowerBound <= x && x <= upperBound;
}

export function isInOpenInterval(x: number, lowerBound: number, upperBound: number) {
    return lowerBound < x && x < upperBound;
}
