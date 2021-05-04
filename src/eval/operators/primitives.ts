import {Number, Boolean, Symbol, Context} from "../../types.js";
import {createGenericOperator} from "../../operator/operator.js";
import {registerOperator} from "../evaluate.js";
import {createBoolean, createNumber} from "../../create/create.js";
import {getValueFromContext} from "../../utils/contextUtils.js";

export default () => {
    const numberOperator = createGenericOperator(
        (numberNode: Number) => createNumber(numberNode.value)
    );
    registerOperator("Number", numberOperator);

    const booleanOperator = createGenericOperator(
        (booleanNode: Boolean) => createBoolean(booleanNode.value)
    );
    registerOperator("Boolean", booleanOperator);

    const symbolOperator = createGenericOperator(
        (symbolNode: Symbol, context: Context) => getValueFromContext(symbolNode.name, context)
    );
    registerOperator("Symbol", symbolOperator);
}