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
                        type: "lessOrEqual",
                        left: terms[index],
                        right: terms[index + 1]
                    })
                    break;

                case ">=":
                    relations.push({
                        type: "greaterOrEqual",
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

Expression = Or

// logic
Or = left:And _ "|" _ right:Or {
    return {
        type: "or",
        left, 
        right
    };
} / And

And = left:Not _ "&" _ right:And {
    return {
        type: "and",
        left, 
        right
    };
} / Not

Not = "!" _ value:RelationChain {
    return {
        type: "not",
        value
    };
} / RelationChain

RelationChain = startTerm:Term _ chainElements:RelationChainElement+ {
    const terms = [startTerm, ...chainElements.map(chainElement => chainElement.term)];
    const relationSymbols = chainElements.map(chainElement => chainElement.relationSymbol);
    return transformRelationChain(terms, relationSymbols);
} / Term

RelationChainElement = relationSymbol:("=" / "<" / ">" / "<=" / ">=") _ term:Term _ {
    return {
        relationSymbol, 
        term
    };
}


// arithmetic
Term = Plus

Plus = left:Minus _ "+" _ right:Plus {
    return {
        type: "plus",
        left, 
        right
    };
} / Minus

Minus = left:Times _ "-" _ right:Minus {
    return {
        type: "minus",
        left, 
        right
    };
} / Negate

Negate = _ "-" _ value:Negate {
    return {
        type: "negate",
        value
    };
} / Times

Times = left:Divided _ "*" _ right:Times {
    return {
        type: "times",
        left,
        right
    };
} / Divided

Divided = left:Power _ "/" _ right:Divided {
    return {
        type: "devided",
        left, 
        right
    };
} / Power

Power = left:Value _ "^" _ right:Value {
    return {
        type: "power",
        left, 
        right
    };
} / Value

// values
Value = Boolean / Symbol / Number / Vector / "(" _ expr:Expression _ ")" {
    return expr;
}

ListElement = _ "," _ item:Expression {
    return item;
}

List = first:Expression rest:ListElement* {
    return [first, ...rest];
}

Vector = "[" _ list:List? _ "]" {
    return {
        type: "vector",
        values: list ? list : []
    };
}

Boolean "boolean" = v:("true" / "false") { 
    return {
        type: "boolean", 
        value: v === "true"
    };
}

Symbol "symbol" = ([a-z] / [A-Z] / "_")+ { 
    return {
        type: "symbol", 
        name: text()
    }; 
}

Number "number" = [0-9]+ ("." [0-9]*)? { 
    return {
        type: "number", 
        value: parseFloat(text(), 10)
    }; 
}

// misc
_ "whitespace"
  	= [ \t\n\r]*