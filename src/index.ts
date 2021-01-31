import {Number} from "./types.js";
import {createNumber} from "./create/create.js";

const foo: Number = {
    type: "Number",
    value: 3.14
}

console.log(foo);
console.log(createNumber(4));
