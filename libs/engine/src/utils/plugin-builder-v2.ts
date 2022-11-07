import { SyntaxTreeNode } from '../types';

interface HeaderItem<T extends string, U extends SyntaxTreeNode['type']> {
    name: T;
    type: U;
}

type Header<T extends HeaderItem<string, SyntaxTreeNode['type']>[]> = T;

function createHeaderItem<T extends string, U extends SyntaxTreeNode['type']>(name: T, type: U): HeaderItem<T> {
    return { name, type };
}

function createHeader<T extends HeaderItem<string, SyntaxTreeNode['type']>[]>(...items: T): Header<T> {
    return items;
}

const testHeader = createHeader(
    createHeaderItem('foo', 'number'),
    createHeaderItem('bar', 'boolean'),
    createHeaderItem('test', 'equals'),
);

function testFunc<T extends Header<HeaderItem<string, SyntaxTreeNode['type']>[]>>(
    _header: T,
    name: T[number]['name'],
    type: T[number]['type'],
) {
    return name + type;
}

testFunc<typeof testHeader>(testHeader, 'foo', 'number');
