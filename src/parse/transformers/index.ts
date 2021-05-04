import primitiveTransformersInit from "./primitives.js";
import booleanOperationTransformersInit from "./booleanOperations.js";
import numericOperationTransformersInit from "./numericOperations.js";
import miscTransformersInit from"./misc.js";

export default () => {
    primitiveTransformersInit();
    booleanOperationTransformersInit();
    numericOperationTransformersInit();
    miscTransformersInit();
}