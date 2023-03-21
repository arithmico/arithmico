export function euclideanDivision(n: number, m: number) {
    const division = n / m;
    return division > 0 ? Math.floor(division) : Math.ceil(division);
}
