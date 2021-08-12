import primitivesInit from "./primitives.js";
import booleanOperatorsInit from "./booleanOperators.js";
import functionOperatorInit from "./functionCall.js";
import numericOperatorsInit from "./numericOperators.js"
import definitionOperatorInit from "./definition.js";

export default () => {
    primitivesInit();
    booleanOperatorsInit();
    numericOperatorsInit();
    functionOperatorInit();
    definitionOperatorInit();
}