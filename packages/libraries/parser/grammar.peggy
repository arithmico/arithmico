{{
    function transformRelationChain(terms, relationSymbols) {
        let relations = [];
        relationSymbols.forEach((relationSymbol, index) => {
            switch (relationSymbol) {
                case "=":
                    relations.push({
                        type: "equals",
                        left: terms[index],
                        right: terms[index + 1]
                    });
                    break;

                case "<":
                    relations.push({
                        type: "less",
                        left: terms[index],
                        right: terms[index + 1]
                    })
                    break;

                case ">":
                    relations.push({
                        type: "greater",
                        left: terms[index],
                        right: terms[index + 1]
                    })
                    break;

                case "<=":
                    relations.push({
                        type: "lessOrEquals",
                        left: terms[index],
                        right: terms[index + 1]
                    })
                    break;

                case ">=":
                    relations.push({
                        type: "greaterOrEquals",
                        left: terms[index],
                        right: terms[index + 1]
                    })
                    break;
            
                default:
                    error("SyntaxError: failed to parse relation chain");
            }
        });

        if (relations.length === 1) {
            return relations[0];
        }

        return relations.reduceRight((right, left) => ({
            type: "and",
            left,
            right
        }));
    }
}}

Start = _ v:(Define / Expression) _ {
    return v;
}

Define = DefineFunction / DefineVariable

DefineVariable = symbol:Symbol _ ":=" _ expr:Expression {
    return {
        type: "define",
        name: symbol.name,
        value: expr
    };
}

// define function with name
SymbolType = _ ":" _ type:("number" / "boolean" / "vector" / "function" / "any") {
    return type;
}
TypedSymbol = symbol:Symbol type:SymbolType? {
    return {
        name: symbol.name,
        type: type ? type : "any",
        evaluate: true
    };
}
SymbolListItem = _ ItemSeparator _ symbol:TypedSymbol {
    return symbol;
}
SymbolList = first:TypedSymbol _ rest:SymbolListItem* {
    return [first, ...rest];
}
DefineFunction = symbol:Symbol _ "(" _ parameters:SymbolList _ ")" _ ":=" _ expr:Expression {
    return {
        type: "define",
        name: symbol.name,
        value: {
            type: "lambda",
            header: parameters ? parameters : [],
            expression: expr
        }
    };
}

// define lambda function
DefineLambdaFunction = LambdaWithTypedParameters / LambdaWithOneUntypedParameter

LambdaWithTypedParameters = "(" _ parameters:SymbolList _ ")" _ ("->" / "→") _ expr:Expression {
    return {
        type: "lambda",
        header: parameters ? parameters : [],
        expression: expr
    };
}

LambdaWithOneUntypedParameter = parameter:Symbol _ ("->" / "→") _ expr:Expression {
    return {
        type: "lambda",
        header: [{
            name: parameter.name,
            type: "any",
            evaluate: true
        }],
        expression: expr
    }
}

Expression = Or

// ===============================================================================
// |             Logic Expressions                                               |
// ===============================================================================

Or = left:And _ "|" _ right:Or {
    return {
        type: "or",
        left, 
        right
    };
} / And

And = left:RelationChain _ "&" _ right:And {
    return {
        type: "and",
        left, 
        right
    };
} / RelationChain

RelationChain = startTerm:Term chainElements:RelationChainElement+ {
    const terms = [startTerm, ...chainElements.map(chainElement => chainElement.term)];
    const relationSymbols = chainElements.map(chainElement => chainElement.relationSymbol);
    return transformRelationChain(terms, relationSymbols);
} / Term

RelationChainElement = _ relationSymbol:("=" / "<=" / ">=" / "<" / ">") _ term:Term _ {
    return {
        relationSymbol, 
        term
    };
}


// ===============================================================================
// |             Arithmetic Expressions                                          |
// ===============================================================================

Term = Plus

Plus = left:Minus _ "+" _ right:Plus {
    return {
        type: "plus",
        left, 
        right
    };
} / Minus

// the ugly way to eliminate left recursion 
MinusItem = _ "-" _ item:Times {
    return item;
}
Minus = first:Times rest:MinusItem+ {
    const items = [first, ...rest];
    return items.reduce((left, right) => ({
        type: "minus",
        left, 
        right
    }));
} / Times

Times = left:Divided _ "*" _ right:Times {
    return {
        type: "times",
        left,
        right
    };
} / Divided

// the ugly way to eliminate left recursion
DividedItem = _ "/" _ item:Power {
    return item;
}
Divided = first:Power rest:DividedItem+ {
    const items = [first, ...rest];
    return items.reduce((left, right) => ({
        type: "divided",
        left,
        right
    }));
} / Power

Power = left:Value _ "^" _ right:Negate {
    return {
        type: "power",
        left, 
        right
    };
} / Negate

Negate = _ "-" _ value:Power {
    return {
        type: "negate",
        value
    };
} / MethodCall

MethodCall = object:Value _ "." _ method:Symbol _ "(" _ parameters:List? _ ")" {
    return {
        type: "methodCall",
        object,
        method: method.name,
        parameters: parameters ? parameters : []
    };
} / Value / LatexExpression

// ===============================================================================
// |             Primitive and Subexpressions                                    |
// ===============================================================================
Value = Boolean
/ FunctionCall 
/ DefineLambdaFunction
/ Factorial
/ Symbol 
/ Number
/ String
/ Vector
/ SubExpression

SubExpression = "(" _ expr:Expression _ ")" {
    return expr;
}

ListElement = _ ItemSeparator _ item:Expression {
    return item;
}

List = _ first:Expression rest:ListElement* _ {
    return [first, ...rest];
}

Vector = "[" list:List? "]" {
    return {
        type: "vector",
        values: list ? list : []
    };
}

FunctionCall = func:(Symbol / SubExpression) _ "(" parameters:List? ")" {
    return {
        type: "functionCall",
        function: func,
        parameters: parameters ? parameters : []
    }
}

Boolean "boolean" = v:("true" / "false") { 
    return {
        type: "boolean", 
        value: v === "true"
    };
}

Symbol "symbol" = head:Name ":" tail:Symbol {
    return {
        type: "symbol",
        name: `${head.name}:${tail.name}`
    }
} / Name

Name "name" = ([a-z] / [A-Z] / "_") ([a-z] / [A-Z] / [0-9] / "_")* { 
    return {
        type: "symbol", 
        name: text()
    }; 
}

Number "number" = [0-9]+ (DecimalSeparator [0-9]*)? { 
    return {
        type: "number", 
        value: parseFloat(text().replace(",", "."), 10)
    }; 
}

String = DoubleQuotesString / SingleQuotesString

DoubleQuotesString = '"' content:$DoubleQuotesStringContent '"' {
	return {
    	type: "string",
        value: content
    }
}

SingleQuotesString = "'" content:$SingleQuotesStringContent "'" {
    return {
        type: "string",
        value: content
    }
}

DoubleQuotesStringContent = (StringCharacter / '\\"' / "'")*
SingleQuotesStringContent = (StringCharacter / "\\'" / '"')*

StringCharacter = [^\'\"\\] / "\\\\"

Factorial = value:Number "!" {
                return {
                    type: "functionCall",
                    function: {
                        type: "symbol",
                        name: "fact"
                    },
                    parameters: [value]
                }
            }


// ===============================================================================
// |             Latex Expressions                                               |
// ===============================================================================

LatexExpression = LatexArccos
/ LatexArcsin
/ LatexArctan
/ LatexCos
/ LatexCosh
/ LatexFrac
/ LatexGcd
/ LatexLg
/ LatexLog
/ LatexLogN
/ LatexLogWithBase
/ LatexMax
/ LatexMin
/ LatexPi
/ LatexSin
/ LatexSinh
/ LatexSqrt
/ LatexSqrtWithDegree
/ LatexTan
/ LatexTanh
/ LatexSubExpression

LatexArccos = "\\arccos" _ "(" _ expr:Expression _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "acos"
        },
        parameters: [expr]
    }
}

LatexArcsin = "\\arcsin" _ "(" _ expr:Expression _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "asin"
        },
        parameters: [expr]
    }
}

LatexArctan = "\\arctan" _ "(" _ expr:Expression _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "atan"
        },
        parameters: [expr]
    }
}

LatexCos = "\\cos" _ "(" _ expr:Expression _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "cos"
        },
        parameters: [expr]
    }
}

LatexCosh = "\\cosh" _ "(" _ expr:Expression _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "cosh"
        },
        parameters: [expr]
    }
}

LatexFrac = "\\frac" _ "{" _ left:Expression _ "}" _ "{" _ right:Expression _ "}" {
    return {
        type: "divided",
        left,
        right
    }
}

LatexGcd = "\\gcd" _ "(" _ left:Expression _ ItemSeparator _ right:Expression _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "gcd"
        },
        parameters: [left, right]
    }
}

LatexLg = "\\lg" _ "(" _ expr:Expression _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "lg"
        },
        parameters: [expr]
    }
}

LatexLog = "\\log" _ "(" _ expr:Expression _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "lg"
        },
        parameters: [expr]
    }
}

LatexLogN = "\\ln" _ "(" _ expr:Expression _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "ln"
        },
        parameters: [expr]
    }
}

LatexLogWithBase = "\\log" _ "_{" _ base:Expression _ "}" _ "(" _ expr:Expression _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "log"
        },
        parameters: [expr, base]
    }
}

LatexMax = "\\max" _ "(" _ parameters:List _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "max"
        },
        parameters: parameters
    }
}

LatexMin = "\\min" _ "(" _ parameters:List _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "min"
        },
        parameters: parameters
    }
}

LatexPi = "\\pi" {
    return {
        type: "symbol",
        name: "pi"
    }
}

LatexSin = "\\sin" _ "(" _ expr:Expression _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "sin"
        },
        parameters: [expr]
    }
}

LatexSinh = "\\sinh" _ "(" _ expr:Expression _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "sinh"
        },
        parameters: [expr]
    }
}

LatexSqrt = "\\sqrt" _ "{" _ expr:Expression _ "}" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "sqrt"
        },
        parameters: [expr]
    }
}

LatexSqrtWithDegree = "\\sqrt" _ "[" _ degree:Expression _ "]" _ "{" _ expr:Expression _ "}" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "root"
        },
        parameters: [expr, degree]
    }
}

LatexTan = "\\tan" _ "(" _ expr:Expression _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "tan"
        },
        parameters: [expr]
    }
}

LatexTanh = "\\tanh" _ "(" _ expr:Expression _ ")" {
    return {
        type: "functionCall",
        function: {
            type: "symbol",
            name: "tanh"
        },
        parameters: [expr]
    }
}

LatexSubExpression = "{" _ expr:Expression _ "}" {
    return expr;
}



// ===============================================================================
// |             Miscellaneous                                                   |
// ===============================================================================

_ "whitespace"
  	= [ \t\n\r]*

ItemSeparator = s:("," / ";") & {
    return options.language === "de" && s === ";" 
        || options.language === "en" && s === ",";
}

DecimalSeparator = s:("." / ",") & {
    return options.language === "de" && s === ","
        || options.language === "en" && s === ".";
}