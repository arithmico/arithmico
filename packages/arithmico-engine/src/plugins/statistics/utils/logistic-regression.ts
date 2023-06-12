import { calculateAvg } from './avg';

// Implementation inspired by: https://developer.ibm.com/articles/implementing-logistic-regression-from-scratch-in-python/
function sigmoidFunction(z: number) {
    return 1 / (1 + Math.exp(-z));
}

function computeGradients(xValues: number[], yValues: number[], predictions: number[]) {
    // derivative of binary cross entropy
    const differences = predictions.map((p, index) => p - yValues[index]);
    const biasGradient = calculateAvg(differences);
    const multipliedXValuesWithDifferences = xValues.map((x, index) => x * differences[index]);
    const weightGradient = calculateAvg(multipliedXValuesWithDifferences);

    return [biasGradient, weightGradient];
}

export function fitLogisticModel(xValues: number[], yValues: number[], learningRate = 0.1, epochs = 10000) {
    let bias = 0;
    let weight = 0;

    for (let i = 0; i < epochs; i++) {
        const multipliedXValuesWithWeight = xValues.map((x) => x * weight + bias);
        const predictions = multipliedXValuesWithWeight.map((z) => sigmoidFunction(z));
        const [biasError, weightError] = computeGradients(xValues, yValues, predictions);
        weight = weight - learningRate * weightError;
        bias = bias - learningRate * biasError;
    }

    return [bias, weight];
}
