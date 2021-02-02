import { createNumber } from "./create.js"

test("create-number", () => {
    expect(createNumber(1.2)).toStrictEqual({
        type: "Number",
        value: 1.2
    });
});