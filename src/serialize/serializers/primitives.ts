import {Boolean, Number, Symbol} from "../../types.js";
import {Serializer} from "../types.js";
import {registerSerializer} from "../index.js";


export default () => {

    const numberSerializer: Serializer<Number> = (node, options) => {
        const [coefficientStr, exponentStr] = node.value.toExponential().split("e");
        const coefficient = parseFloat(coefficientStr);
        const exponent = parseFloat(exponentStr);

        if (Math.abs(exponent) > 1e+4)
            throw `Exponent out of range: ${exponent}`;

        if (Math.abs(exponent) >= options.magnitudeThresholdForScientificNotation) {
            const maxPrecision = coefficient.toPrecision().replace(/[.\-+]/, "").length;
            return `${coefficient.toPrecision(Math.min(
                options.decimalPlaces + 1,
                maxPrecision
            ))} * 10^${
                exponent < 0
                    ? `(${exponent.toFixed()})`
                    : exponent.toFixed()
            }`;
        } else {
            const maxPrecision = node.value.toPrecision().replace(".", "").length;
            return node.value.toPrecision(Math.min(
                Math.abs(exponent) + 1 + options.decimalPlaces,
                maxPrecision
            ));
        }
    };

    const symbolSerializer: Serializer<Symbol> = (node, options) => {
        return node.name;
    };

    const booleanSerializer: Serializer<Boolean> = (node, options) => {
        return node.value.toString();
    };

    registerSerializer("Number", numberSerializer);
    registerSerializer("Symbol", symbolSerializer);
    registerSerializer("Boolean", booleanSerializer);
}