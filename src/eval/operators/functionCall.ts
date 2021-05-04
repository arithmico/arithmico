import {createGenericOperator} from "../../operator/operator.js";
import {Context, FunctionCall, SyntaxTreeNode} from "../../types.js";
import {getFunctionFromContext} from "../../utils/contextUtils.js";
import evaluate, {registerOperator} from "../evaluate.js";

export default () => {
    const functionOperator = createGenericOperator((node: FunctionCall, context: Context): SyntaxTreeNode => {
        const functionStackObject = getFunctionFromContext(node.name, context);

        if (functionStackObject.rawChildren)
            return functionStackObject.evaluator(node.children);

        return functionStackObject.evaluator(node.children.map(child => evaluate(child, context)));
    });
    registerOperator("FunctionCall", functionOperator);
};