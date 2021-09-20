import {createGenericOperator} from "../../operator/operator.js";
import {Context, Definition, FunctionParameter, FunctionSignature, SyntaxTreeNode} from "../../types.js";
import evaluate, {registerOperator} from "../evaluate.js";
import {addValueToContext, createFunctionStackObject, createValueStackObject} from "../../utils/contextUtils.js";

const validateParameterType = (parameterType: FunctionParameter["type"], argument: SyntaxTreeNode): boolean => {
    switch (parameterType) {
        case "any": return true;
        case "boolean": return argument.type === "Boolean";
        case "number": return argument.type === "Number";
        case "vector": return argument.type === "Vector";
    }
    return false;
}

const validateParameters = (name: string, parameterList: FunctionParameter[], argumentList: SyntaxTreeNode[]) => {
    if (parameterList.length !== argumentList.length)
        throw `${name}: invalid number of arguments. Expected ${parameterList.length} got ${argumentList.length}`;

    argumentList.forEach((argument, index) => {
        const expectedType = parameterList[index].type;
        const isValid = validateParameterType(expectedType, argument);
        if (!isValid)
            throw `${name}: invalid parameter type ${index + 1}. Expected ${expectedType} got ${argument.type}.`;
    })
}


const definitionOperator = createGenericOperator((node: Definition, context: Context): SyntaxTreeNode => {
    const [labelNode, valueNode] = node.children;

    if (labelNode.type === "Symbol") {
        const {name} = labelNode;
        const value = evaluate(valueNode, context);
        addValueToContext(context, name, createValueStackObject(value));
        return value;
    } else if (labelNode.type === "FunctionSignature") {
        const {name, parameters} = labelNode as FunctionSignature;

        // check if all parameters have unique names
        const sortedParameterNames = parameters.map(parameter => parameter.name).sort();
        sortedParameterNames.forEach((parameterName, index) => {
            if (sortedParameterNames[index + 1] && sortedParameterNames[index + 1] === name)
                throw "The parameter names of a function must be unique.";
        });

        addValueToContext(context, name, createFunctionStackObject(
            (argumentList, context) => {
                const evaluatedArguments = argumentList.map(argument => evaluate(argument, context));
                validateParameters(name, parameters, evaluatedArguments);

                let localEvaluationContext = {
                    ...context,
                    stack: [
                        ...context.stack,
                        {}
                    ]
                };
                parameters.forEach(({name}, index) => {
                    addValueToContext(localEvaluationContext, name, createValueStackObject(evaluatedArguments[index]));
                });

                return evaluate(valueNode, localEvaluationContext);
            }
        ));

        return valueNode;
    }

    throw `No value can be assigned to an object of type ${labelNode.type}.`;
});

export default () => {
    registerOperator("Definition", definitionOperator);
}