/*
    Reference:
    ALGORITHM 708, COLLECTED ALGORITHMS FROM ACM.
    THIS WORK PUBLISHED IN TRANSACTIONS ON MATHEMATICAL SOFTWARE,
    VOL. 18, NO. 3, SEPTEMBER, 1992, PP. 360-373z.

    The following algorithm is based heavily on the above work.
    Naming is adopted.
 */

/*
        EVALUATION OF LN(GAMMA(A)) FOR POSITIVE A

        WRITTEN BY ALFRED H. MORRIS
        NAVAL SURFACE WARFARE CENTER
        DAHLGREN, VIRGINIA
 */
function GAMLN(A: number) {
    const D = 0.5 * (Math.log(2 * Math.PI) - 1); // 0.418938533204673

    const C0 = 0.833333333333333e-1,
        C1 = -0.277777777760991e-2,
        C2 = 0.79365066682539e-3,
        C3 = -0.59520293135187e-3,
        C4 = 0.837308034031215e-3,
        C5 = -0.165322962780713e-2;

    if (A <= 0.8) {
        return GAMLN1(A) - Math.log(A);
    }

    if (A <= 2.25) {
        const T = A - 0.5 - 0.5;
        return GAMLN1(T);
    }

    if (A < 10.0) {
        const N = A - 1.25;
        let T = A;
        let W = 1.0;
        for (let I = 1; I <= N; ++I) {
            T = T - 1.0;
            W = T * W;
        }

        return GAMLN1(T - 1.0) + Math.log(W);
    }

    const T = (1.0 / A) ** 2;
    const W = (((((C5 * T + C4) * T + C3) * T + C2) * T + C1) * T + C0) / A;
    return D + W + (A - 0.5) * (Math.log(A) - 1.0);
}

/*
        COMPUTATION OF LN(GAMMA(B)/GAMMA(A+B)) WHEN B .GE. 8

        IN THIS ALGORITHM, DEL(X) IS THE FUNCTION DEFINED BY
        LN(GAMMA(X)) = (X - 0.5)*LN(X) - X + 0.5*LN(2*PI) + DEL(X).
 */
function ALGDIV(A: number, B: number) {
    const C0 = 0.833333333333333e-1,
        C1 = -0.277777777760991e-2,
        C2 = 0.79365066682539e-3,
        C3 = -0.59520293135187e-3,
        C4 = 0.837308034031215e-3,
        C5 = -0.165322962780713e-2;

    let H, C, X, D;
    if (A <= B) {
        H = A / B;
        C = H / (1.0 + H);
        X = 1.0 / (1.0 + H);
        D = B + (A - 0.5);
    } else {
        H = B / A;
        C = 1.0 / (1.0 + H);
        X = H / (1.0 + H);
        D = A + (B - 0.5);
    }

    // SET SN = (1 - X**N)/(1 - X)
    const X2 = X * X;
    const S3 = 1.0 + (X + X2);
    const S5 = 1.0 + (X + X2 * S3);
    const S7 = 1.0 + (X + X2 * S5);
    const S9 = 1.0 + (X + X2 * S7);
    const S11 = 1.0 + (X + X2 * S9);

    // SET W = DEL(B) - DEL(A + B)
    const T = (1.0 / B) ** 2;
    let W = ((((C5 * S11 * T + C4 * S9) * T + C3 * S7) * T + C2 * S5) * T + C1 * S3) * T + C0;
    W = W * (C / B);

    // COMBINE THE RESULTS
    const U = D * ALNREL(A / B);
    const V = A * (Math.log(B) - 1.0);

    return U <= V ? W - U - V : W - V - U;
}

/*
        EVALUATION OF  DEL(A0) + DEL(B0) - DEL(A0 + B0)  WHERE
        LN(GAMMA(A)) = (A - 0.5)*LN(A) - A + 0.5*LN(2*PI) + DEL(A).
        IT IS ASSUMED THAT A0 .GE. 8 AND B0 .GE. 8.
 */
function BCORR(A0: number, B0: number) {
    const C0 = 0.833333333333333e-1,
        C1 = -0.277777777760991e-2,
        C2 = 0.79365066682539e-3,
        C3 = -0.59520293135187e-3,
        C4 = 0.837308034031215e-3,
        C5 = -0.165322962780713e-2;

    const A = Math.min(A0, B0);
    const B = Math.max(A0, B0);

    const H = A / B;
    const C = H / (1.0 + H);
    const X = 1.0 / (1.0 + H);
    const X2 = X * X;

    // SET SN = (1 - X**N)/(1 - X)
    const S3 = 1.0 + (X + X2);
    const S5 = 1.0 + (X + X2 * S3);
    const S7 = 1.0 + (X + X2 * S5);
    const S9 = 1.0 + (X + X2 * S7);
    const S11 = 1.0 + (X + X2 * S9);

    // SET W = DEL(B) - DEL(A + B)
    let T = (1.0 / B) ** 2;
    let W = ((((C5 * S11 * T + C4 * S9) * T + C3 * S7) * T + C2 * S5) * T + C1 * S3) * T + C0;
    W = W * (C / B);

    // COMPUTE DEL(A) + W
    T = (1.0 / A) ** 2;
    return (((((C5 * T + C4) * T + C3) * T + C2) * T + C1) * T + C0) / A + W;
}

/*
        EVALUATION OF THE FUNCTION LN(GAMMA(A + B))
        FOR 1 .LE. A .LE. 2  AND  1 .LE. B .LE. 2
 */
function GSUMLN(A: number, B: number) {
    const X = A + B - 2.0;
    if (X <= 0.25) {
        return GAMLN1(1.0 + X);
    }
    if (X <= 1.25) {
        return GAMLN1(X) + ALNREL(X);
    }
    return GAMLN1(X - 1.0) + Math.log(X * (1.0 + X));
}

/*
        EVALUATION OF THE LOGARITHM OF THE BETA FUNCTION
 */
function BETALN(A0: number, B0: number) {
    const E = 0.5 * Math.log(2 * Math.PI); // 0.918938533204673

    let A = Math.min(A0, B0);
    let B = Math.max(A0, B0);

    if (A >= 8.0) {
        // PROCEDURE WHEN A .GE. 8
        const W = BCORR(A, B);
        const H = A / B;
        const C = H / (1.0 + H);
        const U = -(A - 0.5) * Math.log(C);
        const V = B * ALNREL(H);

        if (U <= V) {
            return -0.5 * Math.log(B) + E + W - U - V;
        } else {
            return -0.5 * Math.log(B) + E + W - V - U;
        }
    }

    if (A < 1.0) {
        // PROCEDURE WHEN A .LT. 1
        if (B >= 8) {
            return GAMLN(A) + ALGDIV(A, B);
        } else {
            return GAMLN(A) + (GAMLN(B) - GAMLN(A + B));
        }
    }

    // PROCEDURE WHEN 1 .LE. A .LT. 8
    let W;
    if (A > 2.0) {
        if (B > 1000.0) {
            // REDUCTION OF A WHEN B .GT. 1000
            const N = A - 1.0;
            W = 1.0;
            for (let I = 1; I <= N; ++I) {
                A = A - 1.0;
                W = W * (A / (1.0 + A / B));
            }

            return Math.log(W) - N * Math.log(B) + (GAMLN(A) + ALGDIV(A, B));
        }

        // REDUCTION OF A WHEN B .LE. 1000
        const N = A - 1.0;
        W = 1.0;
        for (let I = 1; I <= N; ++I) {
            A = A - 1.0;
            const H = A / B;
            W = W * (H / (1.0 + H));
        }

        W = Math.log(W);
        if (B >= 8.0) {
            return W + GAMLN(A) + ALGDIV(A, B);
        }
    } else {
        if (B <= 2.0) {
            return GAMLN(A) + GAMLN(B) - GSUMLN(A, B);
        }
        W = 0.0;
        if (B >= 8.0) {
            return GAMLN(A) + ALGDIV(A, B);
        }
    }

    // REDUCTION OF B WHEN B .LT. 8
    const N = B - 1.0;
    let Z = 1.0;
    for (let I = 1; I <= N; ++I) {
        B = B - 1.0;
        Z = Z * (B / (A + B));
    }

    return W + Math.log(Z) + (GAMLN(A) + (GAMLN(B) - GSUMLN(A, B)));
}

/*
        EVALUATION OF THE DIGAMMA FUNCTION

        PSI(XX) IS ASSIGNED THE VALUE 0 WHEN THE DIGAMMA FUNCTION CANNOT
        BE COMPUTED.

        THE MAIN COMPUTATION INVOLVES EVALUATION OF RATIONAL CHEBYSHEV
        APPROXIMATIONS PUBLISHED IN MATH. COMP. 27, 123-127(1973) BY
        CODY, STRECOK AND THACHER.

        PSI WAS WRITTEN AT ARGONNE NATIONAL LABORATORY FOR THE FUNPACK
        PACKAGE OF SPECIAL FUNCTION SUBROUTINES. PSI WAS MODIFIED BY
        A.H. MORRIS (NSWC).
 */
function PSI(XX: number) {
    const PIOV4 = Math.PI / 4; // 0.785398163397448E0
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    const DX0 = 1.461632144968362341262659542325721325; // ZERO OF PSI TO EXTENDED PRECISION

    /*
        COEFFICIENTS FOR RATIONAL APPROXIMATION OF
        PSI(X) / (X - X0),  0.5 .LE. X .LE. 3.0
 */
    const P1 = [
        0.89538502298197e-2, 0.477762828042627e1, 0.142441585084029e3, 0.118645200713425e4, 0.363351846806499e4,
        0.413810161269013e4, 0.130560269827897e4,
    ];
    const Q1 = [
        0.448452573429826e2, 0.520752771467162e3, 0.22100079924783e4, 0.364127349079381e4, 0.1908310765963e4,
        0.691091682714533e-5,
    ];

    /*
        COEFFICIENTS FOR RATIONAL APPROXIMATION OF
        PSI(X) - LN(X) + 1 / (2*X),  X .GT. 3.0
*/
    const P2 = [-0.212940445131011e1, -0.701677227766759e1, -0.448616543918019e1, -0.648157123766197];
    const Q2 = [0.322703493791143e2, 0.892920700481861e2, 0.546117738103215e2, 0.777788548522962e1];

    /*
            MACHINE DEPENDENT CONSTANTS ...

            XMAX1  = THE SMALLEST POSITIVE FLOATING POINT CONSTANT
                    WITH ENTIRELY INTEGER REPRESENTATION.  ALSO USED
                    AS NEGATIVE OF LOWER BOUND ON ACCEPTABLE NEGATIVE
                    ARGUMENTS AND AS THE POSITIVE ARGUMENT BEYOND WHICH
                    PSI MAY BE REPRESENTED AS ALOG(X).

            XSMALL = ABSOLUTE ARGUMENT BELOW WHICH PI*COTAN(PI*X)
                    MAY BE REPRESENTED BY 1/X.
     */

    const XMAX1 = Number.MAX_SAFE_INTEGER; //Originally: AMIN1(IPMPAR(3), 1.0/SPMPAR(1))
    const XSMALL = 1e-9;

    let X = XX;
    let AUG = 0.0;
    if (X < 0.5) {
        // X .LT. 0.5,  USE REFLECTION FORMULA  PSI(1-X) = PSI(X) + PI * COTAN(PI*X)
        if (Math.abs(X) <= XSMALL) {
            if (X === 0.0) {
                // ERROR RETURN
                return 0.0;
            }

            // 0 .LT. ABS(X) .LE. XSMALL.  USE 1/X AS A SUBSTITUTE  FOR  PI*COTAN(PI*X)
            AUG = -1.0 / X;
        } else {
            // REDUCTION OF ARGUMENT FOR COTAN
            let W = -X;
            let SGN = PIOV4;
            if (W <= 0.0) {
                W = -W;
                SGN = -SGN;
            }

            //  MAKE AN ERROR EXIT IF X .LE. -XMAX1
            if (W >= XMAX1) {
                // ERROR RETURN
                return 0.0;
            }

            let NQ = Math.trunc(W); // int
            W = W - NQ; // double
            NQ = Math.trunc(W * 4.0); // int
            W = 4.0 * (W - NQ * 0.25); // double
            /*
        W IS NOW RELATED TO THE FRACTIONAL PART OF  4.0 * X.
        ADJUST ARGUMENT TO CORRESPOND TO VALUES IN FIRST
        QUADRANT AND DETERMINE SIGN
 */

            let N = NQ / 2;
            if (N + N !== NQ) {
                W = 1.0 - W;
            }
            const Z = PIOV4 * W;
            let M = N / 2;
            if (M + M !== N) {
                SGN = -SGN;
            }

            // DETERMINE FINAL VALUE FOR  -PI*COTAN(PI*X)
            N = (NQ + 1) / 2;
            M = N / 2;
            M = M + M;

            if (M === N) {
                // CHECK FOR SINGULARITY
                if (Z === 0.0) {
                    // ERROR RETURN
                    return 0.0;
                }

                // USE COS/SIN AS A SUBSTITUTE FOR COTAN, AND  SIN/COS AS A SUBSTITUTE FOR TAN
                AUG = SGN * ((Math.cos(Z) / Math.sin(Z)) * 4.0);
            } else {
                AUG = SGN * ((Math.sin(Z) / Math.cos(Z)) * 4.0);
            }
        }
        X = 1.0 - X;
    }

    if (X <= 3.0) {
        // 0.5 .LE. X .LE. 3.0
        let DEN = X;
        let UPPER = P1[0] * X;
        for (let I = 1; I <= 5; ++I) {
            DEN = (DEN + Q1[I - 1]) * X;
            UPPER = (UPPER + P1[I + 1 - 1]) * X;
        }

        DEN = (UPPER + P1[6]) / (DEN + Q1[5]);
        const XMX0 = X - DX0;
        return DEN * XMX0 + AUG;
    }

    // IF X .GE. XMAX1, PSI = LN(X)
    if (X < XMAX1) {
        // 3.0 .LT. X .LT. XMAX1
        const W = 1.0 / (X * X);
        let DEN = W;
        let UPPER = P2[0] * W;

        for (let I = 1; I <= 3; ++I) {
            DEN = (DEN + Q2[I - 1]) * W;
            UPPER = (UPPER + P2[I + 1 - 1]) * W;
        }

        AUG = UPPER / (DEN + Q2[3]) - 0.5 / X + AUG;
    }

    return AUG + Math.log(X);
}

/*
        EVALUATION OF LN(GAMMA(1 + A)) FOR -0.2 .LE. A .LE. 1.25
 */
function GAMLN1(A: number) {
    const P0 = 0.577215664901533,
        P1 = 0.844203922187225,
        P2 = -0.168860593646662,
        P3 = -0.780427615533591,
        P4 = -0.402055799310489,
        P5 = -0.673562214325671e-1,
        P6 = -0.271935708322958e-2;
    const Q1 = 0.288743195473681e1,
        Q2 = 0.312755088914843e1,
        Q3 = 0.156875193295039e1,
        Q4 = 0.361951990101499,
        Q5 = 0.325038868253937e-1,
        Q6 = 0.667465618796164e-3;

    const R0 = 0.422784335098467,
        R1 = 0.848044614534529,
        R2 = 0.565221050691933,
        R3 = 0.156513060486551,
        R4 = 0.17050248402265e-1,
        R5 = 0.497958207639485e-3;
    const S1 = 0.124313399877507e1,
        S2 = 0.548042109832463,
        S3 = 0.10155218743983,
        S4 = 0.713309612391e-2,
        S5 = 0.116165475989616e-3;

    if (A < 0.6) {
        const W =
            ((((((P6 * A + P5) * A + P4) * A + P3) * A + P2) * A + P1) * A + P0) /
            ((((((Q6 * A + Q5) * A + Q4) * A + Q3) * A + Q2) * A + Q1) * A + 1.0);
        return -A * W;
    }

    const X = A - 0.5 - 0.5;
    const W =
        (((((R5 * X + R4) * X + R3) * X + R2) * X + R1) * X + R0) /
        (((((S5 * X + S4) * X + S3) * X + S2) * X + S1) * X + 1.0);
    return X * W;
}

/*
        COMPUTATION OF 1/GAMMA(A+1) - 1  FOR -0.5 .LE. A .LE. 1.5
 */
function GAM1(A: number) {
    const P = [
        0.577215664901533, -0.409078193005776, -0.230975380857675, 0.597275330452234e-1, 0.76696818164949e-2,
        -0.514889771323592e-2, 0.589597428611429e-3,
    ];

    const Q = [0.1e1, 0.427569613095214, 0.158451672430138, 0.261132021441447e-1, 0.423244297896961e-2];

    const R = [
        -0.422784335098468, -0.771330383816272, -0.244757765222226, 0.118378989872749, 0.930357293360349e-3,
        -0.118290993445146e-1, 0.223047661158249e-2, 0.266505979058923e-3, -0.132674909766242e-3,
    ];

    const S1 = 0.273076135303957;
    const S2 = 0.559398236957378e-1;

    let T = A;
    const D = A - 0.5;
    if (D > 0.0) {
        T = D - 0.5;
    }

    if (T === 0) {
        return 0.0;
    }

    if (T > 0) {
        const TOP = (((((P[6] * T + P[5]) * T + P[4]) * T + P[3]) * T + P[2]) * T + P[1]) * T + P[0];
        const BOT = (((Q[4] * T + Q[3]) * T + Q[2]) * T + Q[1]) * T + 1.0;
        const W = TOP / BOT;

        if (D > 0.0) {
            return (T / A) * (W - 0.5 - 0.5);
        }
        return A * W;
    }

    // T < 0
    const TOP =
        (((((((R[8] * T + R[7]) * T + R[6]) * T + R[5]) * T + R[4]) * T + R[3]) * T + R[2]) * T + R[1]) * T + R[0];
    const BOT = (S2 * T + S1) * T + 1.0;
    const W = TOP / BOT;

    if (D > 0.0) {
        return (T * W) / A;
    }
    return A * (W + 0.5 + 0.5);
}

/*
        EVALUATION OF THE COMPLEMENTARY ERROR FUNCTION

        ERFC1(IND,X) = ERFC(X)            IF IND = 0
        ERFC1(IND,X) = EXP(X*X)*ERFC(X)   OTHERWISE
 */
function ERFC1(IND: number, X: number) {
    const C = 0.564189583547756;

    const A = [
        0.77105849500132e-4, -0.133733772997339e-2, 0.323076579225834e-1, 0.479137145607681e-1, 0.128379167095513,
    ];
    const B = [0.301048631703895e-2, 0.538971687740286e-1, 0.375795757275549];

    const P = [
        -1.36864857382717e-7, 5.64195517478974e-1, 7.21175825088309, 4.31622272220567e1, 1.5298928504694e2,
        3.39320816734344e2, 4.51918953711873e2, 3.00459261020162e2,
    ];
    const Q = [
        1.0, 1.27827273196294e1, 7.70001529352295e1, 2.77585444743988e2, 6.38980264465631e2, 9.3135409485061e2,
        7.90950925327898e2, 3.00459260956983e2,
    ];

    const R = [2.10144126479064, 2.62370141675169e1, 2.13688200555087e1, 4.6580782871847, 2.82094791773523e-1];
    const S = [9.4153775055546e1, 1.8711481179959e2, 9.90191814623914e1, 1.80124575948747e1];

    //      ABS(X) .LE. 0.5
    const AX = Math.abs(X);
    if (AX <= 0.5) {
        const T = X * X;
        const TOP = (((A[0] * T + A[1]) * T + A[2]) * T + A[3]) * T + A[4] + 1.0;
        const BOT = ((B[0] * T + B[1]) * T + B[2]) * T + 1.0;
        const ERFC1 = 0.5 + (0.5 - X * (TOP / BOT));
        return IND !== 0 ? Math.exp(T) * ERFC1 : ERFC1;
    }

    //      0.5 .LT. ABS(X) .LE. 4
    let ERFC1;
    if (AX <= 4.0) {
        const TOP =
            ((((((P[0] * AX + P[1]) * AX + P[2]) * AX + P[3]) * AX + P[4]) * AX + P[5]) * AX + P[6]) * AX + P[7];
        const BOT =
            ((((((Q[0] * AX + Q[1]) * AX + Q[2]) * AX + Q[3]) * AX + Q[4]) * AX + Q[5]) * AX + Q[6]) * AX + Q[7];
        ERFC1 = TOP / BOT;
    } else {
        // ABS(X) .GT. 4
        if (X <= -5.6) {
            // LIMIT VALUE FOR LARGE NEGATIVE X
            return IND !== 0 ? 2.0 * Math.exp(X * X) : 2.0;
        }
        if (IND === 0 && (X > 100.0 || X * X > -EXPARG(1))) {
            // LIMIT VALUE FOR LARGE POSITIVE X  WHEN IND = 0
            return 0.0;
        }

        const T = (1.0 / X) ** 2;
        const TOP = (((R[0] * T + R[1]) * T + R[2]) * T + R[3]) * T + R[4];
        const BOT = (((S[0] * T + S[1]) * T + S[2]) * T + S[3]) * T + 1.0;
        ERFC1 = (C - (T * TOP) / BOT) / AX;
    }

    //      FINAL ASSEMBLY
    if (IND !== 0) {
        if (X < 0.0) {
            ERFC1 = 2.0 * Math.exp(X * X) - ERFC1;
        }
        return ERFC1;
    }
    const W = X * X;
    const T = W;
    const E = W - T;
    ERFC1 = (0.5 + (0.5 - E)) * Math.exp(-T) * ERFC1;
    if (X < 0.0) {
        ERFC1 = 2.0 - ERFC1;
    }
    return ERFC1;
}

/*
        EVALUATION OF THE REAL ERROR FUNCTION
 */
function ERF(X: number) {
    const C = 0.564189583547756;

    const A = [
        0.77105849500132e-4, -0.133733772997339e-2, 0.323076579225834e-1, 0.479137145607681e-1, 0.128379167095513,
    ];
    const B = [0.301048631703895e-2, 0.538971687740286e-1, 0.375795757275549];

    const P = [
        -1.36864857382717e-7, 5.64195517478974e-1, 7.21175825088309, 4.31622272220567e1, 1.5298928504694e2,
        3.39320816734344e2, 4.51918953711873e2, 3.00459261020162e2,
    ];
    const Q = [
        1.0, 1.27827273196294e1, 7.70001529352295e1, 2.77585444743988e2, 6.38980264465631e2, 9.3135409485061e2,
        7.90950925327898e2, 3.00459260956983e2,
    ];

    const R = [2.10144126479064, 2.62370141675169e1, 2.13688200555087e1, 4.6580782871847, 2.82094791773523e-1];
    const S = [9.4153775055546e1, 1.8711481179959e2, 9.90191814623914e1, 1.80124575948747e1];

    const AX = Math.abs(X);
    if (AX <= 0.5) {
        const T = X * X;
        const TOP = (((A[0] * T + A[1]) * T + A[2]) * T + A[3]) * T + A[4] + 1.0;
        const BOT = ((B[0] * T + B[1]) * T + B[2]) * T + 1.0;
        return X * (TOP / BOT);
    }

    if (AX <= 4.0) {
        const TOP =
            ((((((P[0] * AX + P[1]) * AX + P[2]) * AX + P[3]) * AX + P[4]) * AX + P[5]) * AX + P[6]) * AX + P[7];
        const BOT =
            ((((((Q[0] * AX + Q[1]) * AX + Q[2]) * AX + Q[3]) * AX + Q[4]) * AX + Q[5]) * AX + Q[6]) * AX + Q[7];
        let ERF = 0.5 + (0.5 - (Math.exp(-X * X) * TOP) / BOT);
        if (X < 0.0) {
            ERF = -ERF;
        }
        return ERF;
    }

    if (AX >= 5.8) {
        return X >= 0 ? 1.0 : -1.0;
    }

    const X2 = X * X;
    const T = 1.0 / X2;
    const TOP = (((R[0] * T + R[1]) * T + R[2]) * T + R[3]) * T + R[4];
    const BOT = (((S[0] * T + S[1]) * T + S[2]) * T + S[3]) * T + 1.0;
    let ERF = (C - TOP / (X2 * BOT)) / AX;
    ERF = 0.5 + (0.5 - Math.exp(-X2) * ERF);
    return X < 0.0 ? -ERF : ERF;
}

/*
        EVALUATION OF THE FUNCTION X - LN(1 + X)
 */
function RLOG1(X: number) {
    const A = 0.566749439387324e-1;
    const B = 0.456512608815524e-1;
    const P0 = 0.333333333333333,
        P1 = -0.224696413112536,
        P2 = 0.620886815375787e-2;
    const Q1 = -0.127408923933623e1,
        Q2 = 0.354508718369557;

    if (X < -0.39 || X > 0.57) {
        const W = X + 0.5 + 0.5;
        return X - Math.log(W);
    }

    //      ARGUMENT REDUCTION
    let H, W1;
    if (X < -0.18) {
        H = X + 0.3;
        H = H / 0.7;
        W1 = A - H * 0.3;
    } else if (X > 0.18) {
        H = 0.75 * X - 0.25;
        W1 = B + H / 3.0;
    } else {
        H = X;
        W1 = 0.0;
    }

    //      SERIES EXPANSION
    const R = H / (H + 2.0);
    const T = R * R;
    const W = ((P2 * T + P1) * T + P0) / ((Q2 * T + Q1) * T + 1.0);
    return 2.0 * T * (1.0 / (1.0 - R) - R * W) + W1;
}

/*
        EVALUATION OF THE FUNCTION LN(1 + A)
 */
function ALNREL(A: number) {
    const P1 = -0.129418923021993e1,
        P2 = 0.405303492862024,
        P3 = -0.178874546012214e-1;
    const Q1 = -0.162752256355323e1,
        Q2 = 0.747811014037616,
        Q3 = -0.845104217945565e-1;

    if (Math.abs(A) <= 0.375) {
        const T = A / (A + 2.0);
        const T2 = T * T;
        const W = (((P3 * T2 + P2) * T2 + P1) * T2 + 1.0) / (((Q3 * T2 + Q2) * T2 + Q1) * T2 + 1.0);
        return 2.0 * T * W;
    }

    const X = 1.0 + A;
    return Math.log(X);
}

/*
        EVALUATION OF THE FUNCTION EXP(X) - 1
 */
function REXP(X: number) {
    const P1 = 0.914041914819518e-9,
        P2 = 0.238082361044469e-1;
    const Q1 = -0.499999999085958,
        Q2 = 0.107141568980644,
        Q3 = -0.119041179760821e-1,
        Q4 = 0.595130811860248e-3;

    if (Math.abs(X) <= 0.15) {
        return X * (((P2 * X + P1) * X + 1.0) / ((((Q4 * X + Q3) * X + Q2) * X + Q1) * X + 1.0));
    }

    const W = Math.exp(X);
    if (X <= 0.0) {
        return W - 0.5 - 0.5;
    }

    return W * (0.5 + (0.5 - 1.0 / W));
}

/*
        EVALUATION OF EXP(MU + X)
 */
function ESUM(MU: number, X: number) {
    if (X > 0.0) {
        const W = MU + X;
        if (MU <= 0 && W >= 0.0) {
            return Math.exp(W);
        }
        return Math.exp(MU) * Math.exp(X);
    }

    if (MU >= 0) {
        const W = MU + X;
        if (W <= 0.0) {
            return Math.exp(W);
        }
    }

    return Math.exp(MU) * Math.exp(X);
}

/*
        IF L = 0 THEN  EXPARG(L) = THE LARGEST POSITIVE W FOR WHICH
        EXP(W) CAN BE COMPUTED.

        IF L IS NONZERO THEN  EXPARG(L) = THE LARGEST NEGATIVE W FOR
        WHICH THE COMPUTED VALUE OF EXP(W) IS NONZERO.

        NOTE... ONLY AN APPROXIMATE VALUE FOR EXPARG(L) IS NEEDED.
 */
function EXPARG(L: number) {
    //B = IPMPAR(4) = returns the base, nowadays base = 2
    const LNB = Math.LN2; //0.69314718055995

    let M;
    if (L === 0) {
        M = 1023; //IPMPAR(7) = the largest exponent (here double)
        return 0.99999 * (M * LNB);
    } else {
        M = -1023; //IPMPAR(6) - 1 = the smallest exponent - 1 (here double)
        return 0.99999 * (M * LNB);
    }
}

/*
        ASYMPTOTIC EXPANSION FOR IX(A,B) FOR LARGE A AND B.
        LAMBDA = (A + B)*Y - B  AND EPS IS THE TOLERANCE USED.
        IT IS ASSUMED THAT LAMBDA IS NONNEGATIVE AND THAT
        A AND B ARE GREATER THAN OR EQUAL TO 15.
 */
function BASYM(A: number, B: number, LAMBDA: number, EPS: number) {
    let J0, J1;

    const A0: number[] = new Array(21).fill(0);
    const B0: number[] = new Array(21).fill(0);
    const C: number[] = new Array(21).fill(0);
    const D: number[] = new Array(21).fill(0);
    /*
        ****** NUM IS THE MAXIMUM VALUE THAT N CAN TAKE IN THE DO LOOP
            ENDING AT STATEMENT 50. IT IS REQUIRED THAT NUM BE EVEN.
            THE ARRAYS A0, B0, C, D HAVE DIMENSION NUM + 1.
     */
    const NUM = 20;
    const E0 = 2 / Math.sqrt(Math.PI); //1.12837916709551
    const E1 = 2 ** (-3 / 2); //0.353553390593274
    let BASYM = 0.0;

    let H, R0, R1, W0;
    if (A >= B) {
        H = B / A;
        R0 = 1.0 / (1.0 + H);
        R1 = (B - A) / A;
        W0 = 1.0 / Math.sqrt(B * (1.0 + H));
    } else {
        H = A / B;
        R0 = 1.0 / (1.0 + H);
        R1 = (B - A) / B;
        W0 = 1.0 / Math.sqrt(A * (1.0 + H));
    }

    const F = A * RLOG1(-LAMBDA / A) + B * RLOG1(LAMBDA / B);
    const T = Math.exp(-F);
    if (T === 0.0) {
        return BASYM;
    }

    const Z0 = Math.sqrt(F);
    const Z = 0.5 * (Z0 / E1);
    const Z2 = F + F;

    A0[0] = (2.0 / 3.0) * R1;
    C[0] = -0.5 * A0[0];
    D[0] = -C[0];
    J0 = (0.5 / E0) * ERFC1(1, Z0);
    J1 = E1;
    let SUM = J0 + D[0] * W0 * J1;

    let S = 1.0;
    const H2 = H * H;
    let HN = 1.0;
    let W = W0;
    let ZNM1 = Z;
    let ZN = Z2;

    for (let N = 2; N <= NUM; N += 2) {
        HN = H2 * HN;
        A0[N - 1] = (2.0 * R0 * (1.0 + H * HN)) / (N + 2.0);
        const NP1 = N + 1;
        S = S + HN;
        A0[NP1 - 1] = (2.0 * R1 * S) / (N + 3.0);

        for (let I = N; I <= NP1; ++I) {
            const R = -0.5 * (I + 1.0);
            B0[0] = R * A0[0];

            for (let M = 2; M <= I; ++M) {
                let BSUM = 0.0;
                const MM1 = M - 1;

                for (let J = 1; J <= MM1; ++J) {
                    const MMJ = M - J;
                    BSUM = BSUM + (J * R - MMJ) * A0[J - 1] * B0[MMJ - 1];
                }
                B0[M - 1] = R * A0[M - 1] + BSUM / M;
            }
            C[I - 1] = B0[I - 1] / (I + 1.0);

            let DSUM = 0.0;
            const IM1 = I - 1;
            for (let J = 1; J <= IM1; ++J) {
                const IMJ = I - J;
                DSUM = DSUM + D[IMJ - 1] * C[J - 1];
            }
            D[I - 1] = -(DSUM + C[I - 1]);
        }

        J0 = E1 * ZNM1 + (N - 1.0) * J0;
        J1 = E1 * ZN + N * J1;
        ZNM1 = Z2 * ZNM1;
        ZN = Z2 * ZN;
        W = W0 * W;
        const T0 = D[N - 1] * W * J0;
        W = W0 * W;
        const T1 = D[NP1 - 1] * W * J1;
        SUM = SUM + (T0 + T1);

        if (Math.abs(T0) + Math.abs(T1) <= EPS * SUM) {
            break;
        }
    }

    const U = Math.exp(-BCORR(A, B));
    BASYM = E0 * T * U * SUM;
    return BASYM;
}

/*
        EVALUATION OF THE INCOMPLETE GAMMA RATIO FUNCTIONS
        P(A,X) AND Q(A,X)

        IT IS ASSUMED THAT A .LE. 1.  EPS IS THE TOLERANCE TO BE USED.
        THE INPUT ARGUMENT R HAS THE VALUE E**(-X)*X**A/GAMMA(A).
 */
function GRAT1(A: number, X: number, R: number, EPS: number): [number, number] {
    let J, L;
    let P, Q;

    if (A * X === 0.0) {
        if (X <= A) {
            P = 0.0;
            Q = 1.0;
            return [P, Q];
        }
        P = 1.0;
        Q = 0.0;
        return [P, Q];
    }
    if (A === 0.5) {
        if (X >= 0.25) {
            Q = ERFC1(0, Math.sqrt(X));
            P = 0.5 + (0.5 - Q);
            return [P, Q];
        }
        P = ERF(Math.sqrt(X));
        Q = 0.5 + (0.5 - P);
        return [P, Q];
    }

    if (X < 1.1) {
        //      TAYLOR SERIES FOR P(A,X)/X**A
        let AN = 3.0;
        let C = X;
        let SUM = X / (A + 3.0);
        const TOL = (0.1 * EPS) / (A + 1.0);

        let T;
        do {
            AN = AN + 1.0;
            C = -C * (X / AN);
            T = C / (A + AN);
            SUM = SUM + T;
        } while (Math.abs(T) > TOL);

        J = A * X * ((SUM / 6.0 - 0.5 / (A + 2.0)) * X + 1.0 / (A + 1.0));

        const Z = A * Math.log(X);
        const H = GAM1(A);
        const G = 1.0 + H;

        if ((X < 0.25 && Z > -0.13394) || (X >= 0.25 && A < X / 2.59)) {
            L = REXP(Z);
            const W = 0.5 + (0.5 + L);
            Q = (W * J - L) * G - H;
            if (Q < 0.0) {
                P = 1.0;
                Q = 0.0;
                return [P, Q];
            }
            P = 0.5 + (0.5 - Q);
            return [P, Q];
        } else {
            const W = Math.exp(Z);
            P = W * G * (0.5 + (0.5 - J));
            Q = 0.5 + (0.5 - P);
            return [P, Q];
        }
    }

    //      CONTINUED FRACTION EXPANSION
    let A2NM1 = 1.0;
    let A2N = 1.0;
    let B2NM1 = X;
    let B2N = X + (1.0 - A);
    let C = 1.0;

    let AM0;
    let AN0;
    do {
        A2NM1 = X * A2N + C * A2NM1;
        B2NM1 = X * B2N + C * B2NM1;
        AM0 = A2NM1 / B2NM1;
        C = C + 1.0;
        const CMA = C - A;
        A2N = A2NM1 + CMA * A2N;
        B2N = B2NM1 + CMA * B2N;
        AN0 = A2N / B2N;
    } while (Math.abs(AN0 - AM0) > EPS * AN0);

    Q = R * AN0;
    P = 0.5 + (0.5 - Q);
    return [P, Q];
}

/*
        ASYMPTOTIC EXPANSION FOR IX(A,B) WHEN A IS LARGER THAN B.
        THE RESULT OF THE EXPANSION IS ADDED TO W. IT IS ASSUMED
        THAT A .GE. 15 AND B .LE. 1.  EPS IS THE TOLERANCE USED.
        IERR IS A VARIABLE THAT REPORTS THE STATUS OF THE RESULTS.
 */
function BGRAT(A: number, B: number, X: number, Y: number, W: number, EPS: number) {
    let J, LNX, N2;

    const BM1 = B - 0.5 - 0.5;
    const NU = A + 0.5 * BM1;
    if (Y > 0.375) {
        LNX = Math.log(X);
    } else {
        LNX = ALNREL(-Y);
    }
    const Z = -NU * LNX;
    if (B * Z === 0.0) {
        throw 'bgrat: A OR B IS NEGATIVE';
    }
    /*
        COMPUTATION OF THE EXPANSION
        SET R = EXP(-Z)*Z**B/GAMMA(B)
 */
    let R = B * (1.0 + GAM1(B)) * Math.exp(B * Math.log(Z));
    R = R * Math.exp(A * LNX) * Math.exp(0.5 * BM1 * LNX);
    let U = ALGDIV(B, A) + B * Math.log(NU);
    U = R * Math.exp(-U);
    if (U === 0.0) {
        throw 'bgrat: A OR B IS NEGATIVE';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [P, Q] = GRAT1(B, Z, R, EPS);

    const V = 0.25 * (1.0 / NU) ** 2;
    const T2 = 0.25 * LNX * LNX;
    const L = W / U;
    J = Q / R;
    let SUM = J;
    let T = 1.0;
    let CN = 1.0;
    N2 = 0.0;

    const C = new Array(30);
    const D = new Array(30);
    for (let N = 1; N <= 30; ++N) {
        const BP2N = B + N2;
        J = (BP2N * (BP2N + 1.0) * J + (Z + BP2N + 1.0) * T) * V;
        N2 = N2 + 2.0;
        T = T * T2;
        CN = CN / (N2 * (N2 + 1.0));
        C[N - 1] = CN;
        let S = 0.0;

        if (N !== 1) {
            const NM1 = N - 1;
            let COEF = B - N;
            for (let I = 1; I <= NM1; ++I) {
                S = S + COEF * C[I - 1] * D[N - I - 1]; //alt: D[NM1 - I]
                COEF = COEF + B;
            }
        }
        D[N - 1] = BM1 * CN + S / N;
        const DJ = D[N - 1] * J;
        SUM = SUM + DJ;

        if (SUM <= 0.0) {
            throw 'bgrat: A OR B IS NEGATIVE';
        }
        if (Math.abs(DJ) <= EPS * (SUM + L)) {
            break;
        }
    }

    //     ADD THE RESULTS TO W

    W = W + U * SUM;
    return W;
}

/*
        EVALUATION OF  EXP(MU) * (X**A*Y**B/BETA(A,B))
 */
function BRCMP1(MU: number, A: number, B: number, X: number, Y: number) {
    let LAMBDA, LNX, LNY;
    const CONST = 1 / Math.sqrt(2 * Math.PI); // 0.398942280401433

    const A0 = Math.min(A, B);
    if (A0 < 8.0) {
        if (X <= 0.375) {
            LNX = Math.log(X);
            LNY = ALNREL(-X);
        } else if (Y <= 0.375) {
            LNX = ALNREL(-Y);
            LNY = Math.log(Y);
        } else {
            LNX = Math.log(X);
            LNY = Math.log(Y);
        }

        let Z = A * LNX + B * LNY;
        if (A0 >= 1.0) {
            Z = Z - BETALN(A, B);
            return ESUM(MU, Z);
        }

        //      PROCEDURE FOR A .LT. 1 OR B .LT. 1
        let B0 = Math.max(A, B);
        if (B0 >= 8.0) {
            //      ALGORITHM FOR B0 .GE. 8
            const U = GAMLN1(A0) + ALGDIV(A0, B0);
            return A0 * ESUM(MU, Z - U);
        }

        if (B0 <= 1.0) {
            //ALGORITHM FOR B0 .LE. 1
            const BRCMP1 = ESUM(MU, Z);
            if (BRCMP1 === 0.0) {
                return BRCMP1;
            }

            const APB = A + B;
            if (APB > 1.0) {
                const U = A + B - 1.0;
                Z = (1.0 + GAM1(U)) / APB;
            } else {
                Z = 1.0 + GAM1(APB);
            }

            const C = ((1.0 + GAM1(A)) * (1.0 + GAM1(B))) / Z;
            return (BRCMP1 * (A0 * C)) / (1.0 + A0 / B0);
        }

        //      ALGORITHM FOR 1 .LT. B0 .LT. 8
        let U = GAMLN1(A0);
        const N = B0 - 1.0;
        if (N >= 1) {
            let C = 1.0;
            for (let I = 1; I <= N; ++I) {
                B0 = B0 - 1.0;
                C = C * (B0 / (A0 + B0));
            }
            U = Math.log(C) + U;
        }

        Z = Z - U;
        B0 = B0 - 1.0;
        const APB = A0 + B0;
        let T;
        if (APB > 1.0) {
            U = A0 + B0 - 1.0;
            T = (1.0 + GAM1(U)) / APB;
        } else {
            T = 1.0 + GAM1(APB);
        }
        return (A0 * ESUM(MU, Z) * (1.0 + GAM1(B0))) / T;
    }

    //      PROCEDURE FOR A .GE. 8 AND B .GE. 8
    let H, X0, Y0;
    if (A > B) {
        H = B / A;
        X0 = 1.0 / (1.0 + H);
        Y0 = H / (1.0 + H);
        LAMBDA = (A + B) * Y - B;
    } else {
        H = A / B;
        X0 = H / (1.0 + H);
        Y0 = 1.0 / (1.0 + H);
        LAMBDA = A - (A + B) * X;
    }

    let E = -LAMBDA / A;
    let U;
    if (Math.abs(E) > 0.6) {
        U = E - Math.log(X / X0);
    } else {
        U = RLOG1(E);
    }

    E = LAMBDA / B;
    let V;
    if (Math.abs(E) > 0.6) {
        V = E - Math.log(Y / Y0);
    } else {
        V = RLOG1(E);
    }

    const Z = ESUM(MU, -(A * U + B * V));
    return CONST * Math.sqrt(B * X0) * Z * Math.exp(-BCORR(A, B));
}

/*
        EVALUATION OF X**A*Y**B/BETA(A,B)
 */
function BRCOMP(A: number, B: number, X: number, Y: number) {
    let LAMBDA, LNX, LNY;
    const CONST = 1 / Math.sqrt(2 * Math.PI); // 0.398942280401433
    let BRCOMP = 0.0;
    if (X === 0.0 || Y === 0.0) {
        return BRCOMP;
    }

    const A0 = Math.min(A, B);
    if (A0 < 8.0) {
        if (X <= 0.375) {
            LNX = Math.log(X);
            LNY = ALNREL(-X);
        } else if (Y <= 0.375) {
            LNX = ALNREL(-Y);
            LNY = Math.log(Y);
        } else {
            LNX = Math.log(X);
            LNY = Math.log(Y);
        }

        let Z = A * LNX + B * LNY;
        if (A0 >= 1.0) {
            Z = Z - BETALN(A, B);
            return Math.exp(Z);
        }

        //      PROCEDURE FOR A .LT. 1 OR B .LT. 1
        let B0 = Math.max(A, B);
        if (B0 >= 8.0) {
            //      ALGORITHM FOR B0 .GE. 8
            const U = GAMLN1(A0) + ALGDIV(A0, B0);
            return A0 * Math.exp(Z - U);
        }

        if (B0 <= 1.0) {
            //      ALGORITHM FOR B0 .LE. 1
            BRCOMP = Math.exp(Z);
            if (BRCOMP === 0.0) {
                return BRCOMP;
            }

            const APB = A + B;
            if (APB > 1.0) {
                const U = A + B - 1.0;
                Z = (1.0 + GAM1(U)) / APB;
            } else {
                Z = 1.0 + GAM1(APB);
            }

            const C = ((1.0 + GAM1(A)) * (1.0 + GAM1(B))) / Z;
            return (BRCOMP * (A0 * C)) / (1.0 + A0 / B0);
        }

        //      ALGORITHM FOR 1 .LT. B0 .LT. 8
        let U = GAMLN1(A0);
        const N = B0 - 1.0;
        if (N >= 1) {
            let C = 1.0;
            for (let I = 1; I <= N; ++I) {
                B0 = B0 - 1.0;
                C = C * (B0 / (A0 + B0));
            }
            U = Math.log(C) + U;
        }

        Z = Z - U;
        B0 = B0 - 1.0;
        const APB = A0 + B0;
        let T;
        if (APB > 1.0) {
            U = A0 + B0 - 1.0;
            T = (1.0 + GAM1(U)) / APB;
        } else {
            T = 1.0 + GAM1(APB);
        }

        return (A0 * Math.exp(Z) * (1.0 + GAM1(B0))) / T;
    }

    //      PROCEDURE FOR A .GE. 8 AND B .GE. 8
    let H, X0, Y0;
    if (A > B) {
        H = B / A;
        X0 = 1.0 / (1.0 + H);
        Y0 = H / (1.0 + H);
        LAMBDA = (A + B) * Y - B;
    } else {
        H = A / B;
        X0 = H / (1.0 + H);
        Y0 = 1.0 / (1.0 + H);
        LAMBDA = A - (A + B) * X;
    }

    let E = -LAMBDA / A;
    let U;
    if (Math.abs(E) > 0.6) {
        U = E - Math.log(X / X0);
    } else {
        U = RLOG1(E);
    }

    E = LAMBDA / B;
    let V;
    if (Math.abs(E) > 0.6) {
        V = E - Math.log(Y / Y0);
    } else {
        V = RLOG1(E);
    }

    const Z = Math.exp(-(A * U + B * V));
    return CONST * Math.sqrt(B * X0) * Z * Math.exp(-BCORR(A, B));
}

/*
        CONTINUED FRACTION EXPANSION FOR IX(A,B) WHEN A,B .GT. 1.
        IT IS ASSUMED THAT LAMBDA = (A + B)*Y - B.
 */
function BFRAC(A: number, B: number, X: number, Y: number, LAMBDA: number, EPS: number) {
    let BFRAC = BRCOMP(A, B, X, Y);
    if (BFRAC === 0.0) {
        return BFRAC;
    }

    const C = 1.0 + LAMBDA;
    const C0 = B / A;
    const C1 = 1.0 + 1.0 / A;
    const YP1 = Y + 1.0;

    let N = 0.0;
    let P = 1.0;
    let S = A + 1.0;
    let AN = 0.0;
    let BN = 1.0;
    let ANP1 = 1.0;
    let BNP1 = C / C1;
    let R = C1 / C;
    let R0;

    //      CONTINUED FRACTION CALCULATION
    do {
        N = N + 1.0;
        let T = N / A;
        const W = N * (B - N) * X;
        let E = A / S;
        const ALPHA = P * (P + C0) * E * E * (W * X);
        E = (1.0 + T) / (C1 + T + T);
        const BETA = N + W / S + E * (C + N * YP1);
        P = 1.0 + T;
        S = S + 2.0;

        //      UPDATE AN, BN, ANP1, AND BNP1
        T = ALPHA * AN + BETA * ANP1;
        AN = ANP1;
        ANP1 = T;
        T = ALPHA * BN + BETA * BNP1;
        BN = BNP1;
        BNP1 = T;

        R0 = R;
        R = ANP1 / BNP1;
        if (Math.abs(R - R0) <= EPS * R) {
            break;
        }

        //      RESCALE AN, BN, ANP1, AND BNP1
        AN = AN / BNP1;
        BN = BN / BNP1;
        ANP1 = R;
        BNP1 = 1.0;
    } while (N < 10_000);

    BFRAC = BFRAC * R;
    return BFRAC;
}

/*
        EVALUATION OF I_X(A,B) - I_X(A+N,B) WHERE N IS A POSITIVE INTEGER.
        EPS IS THE TOLERANCE USED.
 */
function BUP(A: number, B: number, X: number, Y: number, N: number, EPS: number) {
    //      OBTAIN THE SCALING FACTOR EXP(-MU) AND  EXP(MU)*(X**A*Y**B/BETA(A,B))/A
    const APB = A + B;
    const AP1 = A + 1.0;
    let MU = 0;
    let D = 1.0;
    if (N !== 1 && A >= 1.0 && APB >= 1.1 * AP1) {
        MU = Math.abs(EXPARG(1));
        const K = EXPARG(0);
        if (K < MU) {
            MU = K;
        }
        const T = MU;
        D = Math.exp(-T);
    }

    const BUP = BRCMP1(MU, A, B, X, Y) / A;
    if (N === 1 || BUP === 0.0) {
        return BUP;
    }
    const NM1 = N - 1;
    let W = D;

    //      LET K BE THE INDEX OF THE MAXIMUM TERM
    let K = 0;
    if (B > 1.0) {
        if (Y > 1e-4) {
            const R = ((B - 1.0) * X) / Y - A;
            if (R >= 1.0) {
                K = R < NM1 ? R : NM1;
            }
        } else {
            K = NM1;
        }

        //      ADD THE INCREASING TERMS OF THE SERIES
        for (let I = 1; I <= K; ++I) {
            const L = I - 1;
            D = ((APB + L) / (AP1 + L)) * X * D;
            W = W + D;
        }
        if (K === NM1) {
            return BUP * W;
        }
    }

    //     ADD THE REMAINING TERMS OF THE SERIES
    const KP1 = K + 1;
    for (let I = KP1; I <= NM1; ++I) {
        const L = I - 1;
        D = ((APB + L) / (AP1 + L)) * X * D;
        W = W + D;
        if (D <= EPS * W) {
            break;
        }
    }

    return BUP * W;
}

/*
    POWER SERIES EXPANSION FOR EVALUATING IX(A,B) WHEN B .LE. 1
    OR B*X .LE. 0.7.  EPS IS THE TOLERANCE USED.
 */
function BPSER(A: number, B: number, X: number, EPS: number) {
    let BPSER = 0.0;
    if (X === 0) {
        return BPSER;
    }

    //    COMPUTE THE FACTOR X**A/(A*BETA(A,B))
    const A0 = Math.min(A, B);
    if (A0 >= 1.0) {
        const Z = A * Math.log(X) - BETALN(A, B);
        BPSER = Math.exp(Z) / A;
        if (BPSER === 0.0 || A <= 0.1 * EPS) {
            return BPSER;
        }
    } else {
        let B0 = Math.max(A, B);

        //    PROCEDURE FOR A0 .LT. 1 AND B0 .GE. 8
        if (B0 >= 8.0) {
            const U = GAMLN1(A0) + ALGDIV(A0, B0);
            const Z = A * Math.log(X) - U;
            BPSER = (A0 / A) * Math.exp(Z);
            if (BPSER === 0.0 || A <= 0.1 * EPS) {
                return BPSER;
            }
        }

        //    PROCEDURE FOR A0 .LT. 1 AND 1 .LT. B0 .LT. 8
        if (B0 > 1.0) {
            let U = GAMLN1(A0);
            const M = B0 - 1.0;
            if (M >= 1) {
                let C = 1.0;
                for (let i = 1; i <= M; ++i) {
                    B0 = B0 - 1.0;
                    C = C * (B0 / (A0 + B0));
                }
                U = Math.log(C) + U;
            }
            const Z = A * Math.log(X) - U;
            B0 = B0 - 1.0;
            const APB = A0 + B0;
            let T;
            if (APB > 1.0) {
                U = A0 + B0 - 1.0;
                T = (1.0 + GAM1(U)) / APB;
            } else {
                T = 1.0 + GAM1(APB);
            }
            BPSER = (Math.exp(Z) * (A0 / A) * (1.0 + GAM1(B0))) / T;
            if (BPSER === 0.0 || A <= 0.1 * EPS) {
                return BPSER;
            }
        } else {
            //      PROCEDURE FOR A0 .LT. 1 AND B0 .LE. 1
            BPSER = X ** A;
            if (BPSER === 0.0) {
                return BPSER;
            }

            const APB = A + B;
            let Z;
            if (APB > 1.0) {
                const U = A + B - 1.0;
                Z = (1.0 + GAM1(U)) / APB;
            } else {
                Z = 1.0 + GAM1(APB);
            }
            const C = ((1.0 + GAM1(A)) * (1.0 + GAM1(B))) / Z;
            BPSER = BPSER * C * (B / APB);
            if (BPSER === 0.0 || A <= 0.1 * EPS) {
                return BPSER;
            }
        }
    }

    //      COMPUTE THE SERIES
    let SUM = 0.0;
    let N = 0.0;
    let C = 1.0;
    const TOL = EPS / A;
    let W = C / (A + N);
    while (Math.abs(W) > TOL) {
        N = N + 1.0;
        C = C * (0.5 + (0.5 - B / N)) * X;
        W = C / (A + N);
        SUM = SUM + W;
    }

    BPSER = BPSER * (1.0 + A * SUM);
    return BPSER;
}

/*
    APSER YIELDS THE INCOMPLETE BETA RATIO I(SUB(1-X))(B,A) FOR
    A .LE. MIN(EPS,EPS*B), B*X .LE. 1, AND X .LE. 0.5. USED WHEN
    A IS VERY SMALL. USE ONLY IF ABOVE INEQUALITIES ARE SATISFIED.
 */
function APSER(A: number, B: number, X: number, EPS: number) {
    const G = 0.577215664901533;

    const BX = B * X;
    let T = X - BX;

    let C;
    if (B * EPS > 2e-2) {
        C = Math.log(BX) + G + T;
    } else {
        C = Math.log(X) + PSI(B) + G + T;
    }
    const TOL = 5.0 * EPS * Math.abs(C);
    let J = 1.0;
    let S = 0.0;
    let AJ = T / J;
    while (Math.abs(AJ) > TOL) {
        J = J + 1.0;
        T = T * (X - BX / J);
        AJ = T / J;
        S = S + AJ;
    }

    return -A * (C + S);
}

/*
    EVALUATION OF I_X(A,B) FOR B < MIN(EPS,EPS*A) AND X <= 0.5.
 */
function FPSER(A: number, B: number, X: number, EPS: number) {
    let result = 1.0;
    if (A > 1e-3 * EPS) {
        result = 0.0;
        const T = A * Math.log(X);
        if (T < EXPARG(1)) {
            return result;
        }
        result = Math.exp(T);
    }

    //    NOTE THAT 1/B(A,B) = B
    result = (B / A) * result;
    const TOL = EPS / A;
    let AN = A + 1.0;
    let T = X;
    let C = T / AN;
    let S = T / AN;

    while (Math.abs(C) > TOL) {
        AN = AN + 1.0;
        T = X * T;
        C = T / AN;
        S = S + C;
    }
    result = result * (1.0 + A * S);
    return result;
}

/* EVALUATION OF THE INCOMPLETE BETA FUNCTION I_X(A,B)
    COMPUTES THE VALUES W = I_X(A,B)  AND W1 = 1 - I_X(A,B).
    */
function BRATIO(A: number, B: number, X: number, Y: number): [number, number] {
    let EPS = Number.EPSILON;
    let W = 0.0;
    let W1 = 0.0;

    if (A < 0.0 || B < 0.0) {
        throw 'bratio: A OR B IS NEGATIVE';
    }
    if (A === 0.0 && B === 0.0) {
        throw 'bratio: A = B = 0';
    }
    if (X < 0.0 || X > 1.0) {
        throw 'bratio: X < 0 OR X > 1';
    }
    if (Y < 0.0 || Y > 1.0) {
        throw 'bratio: Y < 0 OR Y > 1';
    }

    const Z = X + Y - 0.5 - 0.5;

    if (Math.abs(Z) > 3.0 * EPS) {
        throw 'bratio: X + Y != 1';
    }

    if (X === 0.0) {
        if (A === 0.0) {
            throw 'bratio: X = A = 0';
        }
        W = 0.0;
        W1 = 1.0;
        return [W, W1];
    }
    if (Y === 0.0) {
        if (B === 0.0) {
            throw 'bratio: Y = B = 0';
        }
        W = 1.0;
        W1 = 0.0;
        return [W, W1];
    }

    if (A === 0.0) {
        W = 1.0;
        W1 = 0.0;
        return [W, W1];
    }
    if (B === 0.0) {
        W = 0.0;
        W1 = 1.0;
        return [W, W1];
    }

    EPS = Math.max(EPS, 1e-15);
    if (Math.max(A, B) < 1e-3 * EPS) {
        // PROCEDURE FOR A AND B .LT. 1.E-3*EPS
        W = B / (A + B);
        W1 = A / (A + B);
        return [W, W1];
    }

    let IND = 0;
    let A0 = A;
    let B0 = B;
    let X0 = X;
    let Y0 = Y;

    if (Math.min(A0, B0) <= 1.0) {
        // PROCEDURE FOR A0 <= 1 OR B0 <= 1
        if (X > 0.5) {
            IND = 1;
            A0 = B;
            B0 = A;
            X0 = Y;
            Y0 = X;
        }

        if (B0 < Math.min(EPS, EPS * A0)) {
            W = FPSER(A0, B0, X0, EPS);
            W1 = 0.5 + (0.5 - W);
            return IND === 0 ? [W, W1] : [W1, W];
        }
        if (A0 < Math.min(EPS, EPS * B0) && B0 * X0 <= 1.0) {
            W1 = APSER(A0, B0, X0, EPS);
            W = 0.5 + (0.5 - W1);
            return IND === 0 ? [W, W1] : [W1, W];
        }

        if (Math.max(A0, B0) > 1.0) {
            if (B0 <= 1.0) {
                W = BPSER(A0, B0, X0, EPS);
                W1 = 0.5 + (0.5 - W);
                return IND === 0 ? [W, W1] : [W1, W];
            }
            if (X0 >= 0.3) {
                // R suggests X0 >= 0.29
                W1 = BPSER(B0, A0, Y0, EPS);
                W = 0.5 + (0.5 - W1);
                return IND === 0 ? [W, W1] : [W1, W];
            }
            if (X0 < 0.1 && (X0 * B0) ** A0 <= 0.7) {
                W = BPSER(A0, B0, X0, EPS);
                W1 = 0.5 + (0.5 - W);
                return IND === 0 ? [W, W1] : [W1, W];
            }
            if (B0 > 15.0) {
                W1 = BGRAT(B0, A0, Y0, X0, W1, 15.0 * EPS);
                W = 0.5 + (0.5 - W1);
                return IND === 0 ? [W, W1] : [W1, W];
            }
            const N = 20;
            W1 = BUP(B0, A0, Y0, X0, N, EPS);
            B0 = B0 + N;
            W1 = BGRAT(B0, A0, Y0, X0, W1, 15.0 * EPS);
            W = 0.5 + (0.5 - W1);
            return IND === 0 ? [W, W1] : [W1, W];
        }
        // min(A0, B0) <= 1.0 && max(A0, B0) <= 1.0

        if (A0 >= Math.min(0.2, B0)) {
            W = BPSER(A0, B0, X0, EPS);
            W1 = 0.5 + (0.5 - W);
            return IND === 0 ? [W, W1] : [W1, W];
        }
        if (X0 ** A0 <= 0.9) {
            W = BPSER(A0, B0, X0, EPS);
            W1 = 0.5 + (0.5 - W);
            return IND === 0 ? [W, W1] : [W1, W];
        }
        if (X0 >= 0.3) {
            W1 = BPSER(B0, A0, Y0, EPS);
            W = 0.5 + (0.5 - W1);
            return IND === 0 ? [W, W1] : [W1, W];
        }
        const N = 20;
        W1 = BUP(B0, A0, Y0, X0, N, EPS);
        B0 = B0 + N;
        W1 = BGRAT(B0, A0, Y0, X0, W1, 15.0 * EPS);
        W = 0.5 + (0.5 - W1);
        return IND === 0 ? [W, W1] : [W1, W];
    }

    //    PROCEDURE FOR A0 > 1 AND B0 > 1
    let LAMBDA = A > B ? (A + B) * Y - B : A - (A + B) * X;
    if (LAMBDA < 0.0) {
        IND = 1;
        A0 = B;
        B0 = A;
        X0 = Y;
        Y0 = X;
        LAMBDA = Math.abs(LAMBDA);
    }

    if (B0 < 40.0 && B0 * X0 <= 0.7) {
        W = BPSER(A0, B0, X0, EPS);
        W1 = 0.5 + (0.5 - W);
        return IND === 0 ? [W, W1] : [W1, W];
    }
    if (B0 < 40.0) {
        let N = Math.trunc(B0);
        B0 = B0 - N;
        if (B0 === 0.0) {
            N = N - 1;
            B0 = 1.0;
        }
        W = BUP(B0, A0, Y0, X0, N, EPS);
        if (X0 <= 0.7) {
            W = W + BPSER(A0, B0, X0, EPS);
            W1 = 0.5 + (0.5 - W);
            return IND === 0 ? [W, W1] : [W1, W];
        }

        if (A0 <= 15.0) {
            N = 20;
            W = W + BUP(A0, B0, X0, Y0, N, EPS);
            A0 = A0 + N;
        }
        W = BGRAT(A0, B0, X0, Y0, W, 15.0 * EPS);
        W1 = 0.5 + (0.5 - W);
        return IND === 0 ? [W, W1] : [W1, W];
    }

    if (A0 <= B0) {
        if (A0 <= 100.0) {
            W = BFRAC(A0, B0, X0, Y0, LAMBDA, 15.0 * EPS);
            W1 = 0.5 + (0.5 - W);
            return IND === 0 ? [W, W1] : [W1, W];
        }
        if (LAMBDA > 0.03 * A0) {
            W = BFRAC(A0, B0, X0, Y0, LAMBDA, 15.0 * EPS);
            W1 = 0.5 + (0.5 - W);
            return IND === 0 ? [W, W1] : [W1, W];
        }
    } else {
        if (B0 <= 100.0) {
            W = BFRAC(A0, B0, X0, Y0, LAMBDA, 15.0 * EPS);
            W1 = 0.5 + (0.5 - W);
            return IND === 0 ? [W, W1] : [W1, W];
        }
        if (LAMBDA > 0.03 * B0) {
            W = BFRAC(A0, B0, X0, Y0, LAMBDA, 15.0 * EPS);
            W1 = 0.5 + (0.5 - W);
            return IND === 0 ? [W, W1] : [W1, W];
        }
    }

    W = BASYM(A0, B0, LAMBDA, 100.0 * EPS);
    W1 = 0.5 + (0.5 - W);
    return IND === 0 ? [W, W1] : [W1, W];
}

export function calculateIncompleteBetaFunction(x: number, a: number, b: number) {
    return BRATIO(a, b, x, 1 - x)[0];
}

export function calculateIncompleteBetaFunctionComplementary(x: number, a: number, b: number) {
    return BRATIO(a, b, x, 1 - x)[1];
}
