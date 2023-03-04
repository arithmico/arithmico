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
