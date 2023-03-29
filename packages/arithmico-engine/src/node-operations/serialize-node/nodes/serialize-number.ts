import { NumberNode, Options } from '../../../types';

function fixDecimalSeparator(serializedNumber: string, decimalSeparator: string) {
    if (decimalSeparator === '.') {
        return serializedNumber;
    }

    return serializedNumber.replace('.', ',');
}

export default function serializeNumber(node: NumberNode, options: Options): string {
    if (node.value === 0) {
        return '0';
    }

    const magnitude = Math.floor(Math.log10(Math.abs(node.value)));

    if (Math.abs(magnitude) > options.magnitudeThresholdForScientificNotation) {
        const mantisse = Math.pow(10, -magnitude) * node.value;
        const mantisseStr = Number(mantisse.toFixed(options.decimalPlaces)).toString();

        if (magnitude < 0) {
            return fixDecimalSeparator(`${mantisseStr} * 10^(${magnitude.toString()})`, options.decimalSeparator);
        }

        return fixDecimalSeparator(`${mantisseStr} * 10^${magnitude.toString()}`, options.decimalSeparator);
    }

    return fixDecimalSeparator(Number(node.value.toFixed(options.decimalPlaces)).toString(), options.decimalSeparator);
}
