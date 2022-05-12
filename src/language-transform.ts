export function transformGerman2English(str: string) {
    console.log('transform');
    if (str.indexOf('.') !== -1) {
        throw { message: 'SyntaxError: unexpected token "."' };
    }
    return str.replace(/,/g, '.').replace(/;/g, ',');
}

export function transformEnglish2German(str: string) {
    if (str.indexOf(';') !== -1) {
        throw { message: 'SyntaxError: unexpected token ";"' };
    }
    return str.replace(/,/g, ';').replace(/\./g, ',');
}
