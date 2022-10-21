import { closeTo } from '../../../../utils/float-utils';

export default function refineResults(results: number[], intervallStart: number, intervallEnd: number): number[] {
    const refinedResults = [];
    const closeToAccuracy =
        Number.EPSILON *
        Math.max(Math.abs(intervallStart), Math.abs(intervallEnd), Math.abs(intervallStart - intervallEnd));
    const sortedResults = [...results].sort();
}
