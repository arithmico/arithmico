import { closeTo } from '../../../../../utils/float-utils';

const ACCURACY_COEFFICIENT = 1e4;

export default function refineResults(results: number[], intervallStart: number, intervallEnd: number): number[] {
    const refinedResults: number[] = [];
    const closeToAccuracy =
        Number.EPSILON *
        ACCURACY_COEFFICIENT *
        Math.max(Math.abs(intervallStart), Math.abs(intervallEnd), Math.abs(intervallStart - intervallEnd));
    const sortedResults = [...results].sort();
    sortedResults.forEach((result) => {
        if (refinedResults.length === 0) {
            refinedResults.push(result);
            return;
        }

        const lastResult = refinedResults.at(-1);
        if (!closeTo(lastResult, result, closeToAccuracy)) {
            refinedResults.push(result);
        }
    });
    return refinedResults;
}
