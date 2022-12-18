import evaluate, { init, isInitialized } from '..';
import { Context, Options, StringResult } from '../types';
import { createContext, createOptions } from './context-utils';

let lastId = 0;

const testOptions = createOptions();

export function createTestContext(stack: Context['stack'], options: Options = testOptions): Context {
    return createContext({ stack, options });
}

export function integrationTest(input: string, expectedOutput: string, context?: Context) {
    if (!isInitialized()) {
        init();
    }

    test(`integration test #${++lastId}: ${input}`, () => {
        expect((<StringResult>evaluate(input, context)).value).toBe(expectedOutput);
    });
}

export function integrationTestThrow(input: string, context?: Context) {
    if (!isInitialized()) {
        init();
    }

    test(`integration test (throw) #${++lastId}: ${input}`, () => {
        expect(evaluate(input, context).type).toStrictEqual('error');
    });
}
