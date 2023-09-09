/*
    reference: Wichura, M.J. (1988). Algorithm AS 241: The Percentage Points of the Normal Distribution. Applied Statistics, 37, 477-484.
    original code: http://lib.stat.cmu.edu/apstat/241
	We are using PPND16 for double precision.
	*/

/* eslint-disable @typescript-eslint/no-loss-of-precision */
export function calculateQuantileOfStandardNormalCDF(probability: number): number {
    // Coefficients for P close to 0.5
    const A0 = 3.387132872796366608,
        A1 = 1.3314166789178437745e2,
        A2 = 1.9715909503065514427e3,
        A3 = 1.3731693765509461125e4,
        A4 = 4.5921953931549871457e4,
        A5 = 6.7265770927008700853e4,
        A6 = 3.3430575583588128105e4,
        A7 = 2.5090809287301226727e3;

    const B1 = 4.2313330701600911252e1,
        B2 = 6.871870074920579083e2,
        B3 = 5.3941960214247511077e3,
        B4 = 2.1213794301586595867e4,
        B5 = 3.930789580009271061e4,
        B6 = 2.8729085735721942674e4,
        B7 = 5.226495278852854561e3;

    // Coefficients for P not close to 0, 0.5 or 1.
    const C0 = 1.42343711074968357734,
        C1 = 4.6303378461565452959,
        C2 = 5.7694972214606914055,
        C3 = 3.64784832476320460504,
        C4 = 1.27045825245236838258,
        C5 = 2.4178072517745061177e-1,
        C6 = 2.27238449892691845833e-2,
        C7 = 7.7454501427834140764e-4;

    const D1 = 2.05319162663775882187,
        D2 = 1.6763848301838038494,
        D3 = 6.8976733498510000455e-1,
        D4 = 1.4810397642748007459e-1,
        D5 = 1.51986665636164571966e-2,
        D6 = 5.475938084995344946e-4,
        D7 = 1.05075007164441684324e-9;

    // Coefficients for P near 0 or 1.
    const E0 = 6.6579046435011037772,
        E1 = 5.4637849111641143699,
        E2 = 1.7848265399172913358,
        E3 = 2.9656057182850489123e-1,
        E4 = 2.6532189526576123093e-2,
        E5 = 1.2426609473880784386e-3,
        E6 = 2.71155556874348757815e-5,
        E7 = 2.01033439929228813265e-7;

    const F1 = 5.9983220655588793769e-1,
        F2 = 1.3692988092273580531e-1,
        F3 = 1.48753612908506148525e-2,
        F4 = 7.868691311456132591e-4,
        F5 = 1.8463183175100546818e-5,
        F6 = 1.4215117583164458887e-7,
        F7 = 2.04426310338993978564e-15;

    const q = probability - 0.5;

    if (Math.abs(q) <= 0.425) {
        // 0.075 <= p <= 0.925
        const r = 0.180625 - q * q;
        return (
            (q * (((((((A7 * r + A6) * r + A5) * r + A4) * r + A3) * r + A2) * r + A1) * r + A0)) /
            (((((((B7 * r + B6) * r + B5) * r + B4) * r + B3) * r + B2) * r + B1) * r + 1)
        );
    } else {
        // closer than 0.075 from {0,1} boundary
        let result;
        let r = q < 0 ? probability : 1 - probability; // r = min(p, 1-p) < 0.075

        if (r <= 0) {
            return 0;
        }
        r = Math.sqrt(-Math.log(r)); // r = sqrt(-log(r))  <==>  min(p, 1-p) = exp( - r^2 )

        if (r <= 5) {
            // <==> min(p,1-p) >= exp(-25) ~= 1.3888e-11
            r -= 1.6;
            result =
                (((((((C7 * r + C6) * r + C5) * r + C4) * r + C3) * r + C2) * r + C1) * r + C0) /
                (((((((D7 * r + D6) * r + D5) * r + D4) * r + D3) * r + D2) * r + D1) * r + 1);
        } else {
            // very close to  0 or 1
            r -= 5;
            result =
                (((((((E7 * r + E6) * r + E5) * r + E4) * r + E3) * r + E2) * r + E1) * r + E0) /
                (((((((F7 * r + F6) * r + F5) * r + F4) * r + F3) * r + F2) * r + F1) * r + 1);
        }

        return q < 0 ? -result : result;
    }
}
