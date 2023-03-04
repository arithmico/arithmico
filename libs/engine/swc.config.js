import { writeFileSync } from 'fs';

function serializeObject(obj) {
    return JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:');
}

const defaultProfile = {
    loadingMode: 'blacklist',
    loadingList: [],
    options: {
        decimalPlaces: 6,
        decimalSeparator: '.',
        magnitudeThresholdForScientificNotation: 6,
        angleUnit: 'degrees',
    },
};

const functions = {
    matrixInverse: true,
    matrixId: true,
    matrixAdj: true,
    matrixCof: true,
    matrixTranspose: true,
    matrixDet: true,

    lsolve: true,

    polynomialDeg: true,
    polynomialAdd: true,
    polynomialSub: true,
    polynomialMul: true,
    polynomialDiv: true,

    tensorRank: true,
    tensorDims: true,

    abs: true,

    exp: true,

    lg: true,
    ln: true,
    log: true,

    min: true,
    max: true,

    sqrt: true,
    root: true,

    round: true,
    floor: true,
    ceil: true,
    table: true,

    sin: true,
    cos: true,
    tan: true,
    asin: true,
    acos: true,
    atan: true,
    sinh: true,
    cosh: true,
    tanh: true,
    asinh: true,
    acosh: true,
    atanh: true,

    ite: true,

    listFilter: true,
    listMap: true,
    listReduce: true,
    listReverse: true,
    listSort: true,
    listConcat: true,
    listRange: true,

    coprime: true,
    eulerPhi: true,

    gcd: true,
    gcdExtended: true,
    lcm: true,

    binco: true,
    fact: true,
    fib: true,

    mod: true,
    idiv: true,

    primeRange: true,
    primeNth: true,
    primeIs: true,
    primePi: true,

    plot: true,

    nderive: true,
    nintegrate: true,
    nsolve: true,
};

const constants = {
    e: true,
    pi: true,
    physicsC: true,
    physicsM_P: true,
    physicsM_N: true,
    physicsM_E: true,
    physicsM_MU: true,
    physicsA_0: true,
    physicsH: true,
    physicsMU_N: true,
    physicsMU_B: true,
    physicsAlpha: true,
    physicsR_inf: true,
    physicsF: true,
    physicsE: true,
    physicsN_A: true,
    physicsK: true,
    physicsR: true,
    physicsEpsilon_0: true,
    physicsMU_0: true,
    physicsG: true,
};

const objects = {
    boolean: true,
    number: true,
    string: true,
    symbol: true,
    vector: true,
};

const operators = {
    define: true,
    lambda: true,
    functionCall: true,
    methodCall: true,

    orBooleanBoolean: true,
    orFunctionFunction: true,

    andBooleanBoolean: true,
    andFunctionFunction: true,

    negateNumber: true,
    negateBoolean: true,
    negateFunction: true,

    equalsNumberNumber: true,
    equalsBooleanBoolean: true,
    equalsFunctionFunction: true,

    lessNumberNumber: true,
    lessFunctionFunction: true,

    lessOrEqualsNumberNumber: true,
    lessOrEqualsFunctionFunction: true,

    greaterNumberNumber: true,
    greaterFunctionFunction: true,

    greaterOrEqualsNumberNumber: true,
    greaterOrEqualsFunctionFunction: true,

    plusNumberNumber: true,
    plusVectorVector: true,
    plusFunctionFunction: true,

    minusNumberNumber: true,
    minusVectorVector: true,
    minusFunctionFunction: true,

    timesNumberNumber: true,
    timesNumberVector: true,
    timesVectorVector: true,
    timesVectorMatrix: true,
    timesMatrixMatrix: true,
    timesFunctionFunction: true,

    dividedNumberNumber: true,
    dividedVectorNumber: true,
    dividedFunctionFunction: true,

    powerNumberNumber: true,
    powerFunctionFunction: true,
};

// eslint-disable-next-line no-undef
const profile = process.env.ARITHMICO_PROFILE ? JSON.parse(process.env.ARITHMICO_PROFILE) : defaultProfile;

const swcConfigContent = {
    jsc: {
        transform: {
            optimizer: {
                simplify: true,
                globals: {
                    vars: {
                        __PROFILE: serializeObject(profile),
                        __OBJECTS: serializeObject(objects),
                        __OPERATORS: serializeObject(operators),
                        __FUNCTIONS: serializeObject(functions),
                        __CONSTANTS: serializeObject(constants),
                    },
                },
            },
        },
        parser: {
            syntax: 'typescript',
        },
        target: 'es2021',
    },
    module: {
        type: 'es6',
    },
    sourceMaps: true,
};

writeFileSync('./.swcrc', JSON.stringify(swcConfigContent, null, 2));
