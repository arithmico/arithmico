import {addBinaryOperatorOverload, createBinaryOperator} from "../../operator/operator.js";
import {createNumber} from "../../create/create.js";
import {Number} from "../../types.js";
import {registerOperator} from "../evaluate.js";

export default () => {
    const addOperator = createBinaryOperator()
    addBinaryOperatorOverload(addOperator, "Number", "Number",
        (left: Number, right: Number) => createNumber(left.value + right.value)
    );
    registerOperator("Add", addOperator);

    const subOperator = createBinaryOperator()
    addBinaryOperatorOverload(subOperator, "Number", "Number",
        (left: Number, right: Number) => createNumber(left.value - right.value)
    );
    registerOperator("Sub", subOperator);

    const mulOperator = createBinaryOperator()
    addBinaryOperatorOverload(mulOperator, "Number", "Number",
        (left: Number, right: Number) => createNumber(left.value * right.value)
    );
    registerOperator("Mul", mulOperator);

    const divOperator = createBinaryOperator()
    addBinaryOperatorOverload(divOperator, "Number", "Number",
        (left: Number, right: Number) => createNumber(left.value / right.value)
    );
    registerOperator("Div", divOperator);

    const powOperator = createBinaryOperator()
    addBinaryOperatorOverload(powOperator, "Number", "Number",
        (left: Number, right: Number) => createNumber(Math.pow(left.value, right.value))
    );
    registerOperator("Pow", powOperator);
}