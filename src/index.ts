import {Number} from "types";
import { createNumber } from "./create/create";

const foo: Number = {
    type: "Number",
    value: 3.14
}

console.log(foo);
console.log(createNumber(4));
