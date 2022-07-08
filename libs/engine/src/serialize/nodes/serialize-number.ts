import { NumberNode, Options } from '../../types';

export default function serializeNumber(node: NumberNode, options: Options): string {
    if (node.value === 0) {
        return '0';
    }

    const magnitude = Math.floor(Math.log10(Math.abs(node.value)));

    if (Math.abs(magnitude) > options.magnitudeThresholdForScientificNotation) {
        const mantisse = Math.pow(10, -magnitude) * node.value;
        const mantisseStr = Number(mantisse.toFixed(options.decimalPlaces)).toString();

        if (magnitude < 0) {
            return `${mantisseStr} * 10^(${magnitude.toString()})`;
        }

        return `${mantisseStr} * 10^${magnitude.toString()}`;
    }

    return Number(node.value.toFixed(options.decimalPlaces)).toString();
}
