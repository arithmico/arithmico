import { readFileSync, writeFileSync } from 'fs';

const features = JSON.parse(readFileSync('./features.json'));

function serializeObject(obj) {
    return JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:');
}

function createFeatureMap(enabledFeatures, availableFeatures) {
    const result = {};
    enabledFeatures.forEach((feature) => {
        result[feature] = true;
    });
    availableFeatures.forEach((feature) => {
        if (!result[feature]) {
            result[feature] = false;
        }
    });
    return result;
}

// eslint-disable-next-line no-undef
const enabledFeatures = JSON.parse(process.env.ARITHMICO_FEATURES || '{}');
console.log(enabledFeatures);
const objects = createFeatureMap(enabledFeatures.objects ?? [], features.objects);
const operators = createFeatureMap(enabledFeatures.operators ?? [], features.operators);
const functions = createFeatureMap(enabledFeatures.functions ?? [], features.functions);
const constants = createFeatureMap(enabledFeatures.constants ?? [], features.constants);

const swcConfigContent = {
    jsc: {
        transform: {
            optimizer: {
                simplify: true,
                globals: {
                    vars: {
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
