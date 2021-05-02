import {Boolean, Number} from "../../types.js";
import {registerOperator} from "../evaluate.js";
import {addBinaryOperatorOverload, createBinaryOperator} from "../../operator/operator.js";
import {createBoolean} from "../../create/create.js";

export default () => {
    const andOperator = createBinaryOperator();
    addBinaryOperatorOverload(
        andOperator, "Boolean", "Boolean",
        (left: Boolean, right: Boolean) => createBoolean(
            left.value && right.value
        )
    );
    registerOperator("And", andOperator);

    const orOperator = createBinaryOperator();
    addBinaryOperatorOverload(
        orOperator, "Boolean", "Boolean",
        (left: Boolean, right: Boolean) => createBoolean(
            left.value || right.value
        )
    );
    registerOperator("Or", orOperator);

    const equalOperator = createBinaryOperator()
    addBinaryOperatorOverload(
        equalOperator, "Boolean", "Boolean",
        (left: Boolean, right: Boolean) => createBoolean(
            left.value === right.value
        )
    );
    addBinaryOperatorOverload(
        equalOperator, "Number", "Number",
        (left: Number, right: Number) => createBoolean(
            left.value === right.value
        )
    );
    registerOperator("Equal", equalOperator);

    const lessThanOperator = createBinaryOperator();
    addBinaryOperatorOverload(
        lessThanOperator, "Number", "Number",
        (left: Number, right: Number) => createBoolean(
            left.value < right.value
        )
    );
    registerOperator("LessThan", lessThanOperator);

    const lessThanOrEqualOperator = createBinaryOperator();
    addBinaryOperatorOverload(
        lessThanOrEqualOperator, "Number", "Number",
        (left: Number, right: Number) => createBoolean(
            left.value <= right.value
        )
    );
    registerOperator("LessThanOrEqual", lessThanOrEqualOperator);

    const greaterThanOperator = createBinaryOperator();
    addBinaryOperatorOverload(
        greaterThanOperator, "Number", "Number",
        (left: Number, right: Number) => createBoolean(
            left.value > right.value
        )
    );
    registerOperator("GreaterThan", greaterThanOperator);

    const greaterThanOrEqualOperator = createBinaryOperator();
    addBinaryOperatorOverload(
        greaterThanOrEqualOperator, "Number", "Number",
        (left: Number, right: Number) => createBoolean(
            left.value >= right.value
        )
    );
    registerOperator("GreaterThanOrEqual", greaterThanOrEqualOperator);
}