import {addTransformer} from "../transform.js";
import {createBoolean, createNumber, createSymbol} from "../../create/create.js";

export default () => {
    addTransformer("Number", (node) => createNumber(node.value as number));
    addTransformer("Boolean", (node) => createBoolean(node.value as boolean));
    addTransformer("Symbol", (node) => createSymbol(node.name as string));
};