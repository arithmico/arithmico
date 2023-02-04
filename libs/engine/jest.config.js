/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
    transform: {
        '^.+\\.(t|j)s$': '@swc/jest',
    },
    testPathIgnorePatterns: ['./node_modules/', './lib/'],
    extensionsToTreatAsEsm: ['.ts'],
    verbose: true,
};
