export type LookupTableFunction<Args extends unknown[], Result> = (...args: Args) => Result;

export type KeyExtractionFunction<KeyType extends string, Args extends unknown[]> = (...args: Args) => KeyType;

export type LookupTable<KeyType extends string, TableFunc extends LookupTableFunction<unknown[], unknown>> = {
    [key in KeyType]: TableFunc;
};

export function createLookupTableFunction<
    KeyType extends string,
    TableFunc extends LookupTableFunction<unknown[], unknown>,
>(
    lookupTable: LookupTable<KeyType, TableFunc>,
    keyExtractionFunction: KeyExtractionFunction<KeyType, Parameters<TableFunc>>,
) {
    const lookupMap = <Map<KeyType, TableFunc>>new Map(Object.entries(lookupTable));

    return (...args: Parameters<TableFunc>) => {
        const key = keyExtractionFunction(...args);

        if (!lookupMap.has(key)) {
            throw `unknown lookup table key: ${key}`;
        }

        return <ReturnType<TableFunc>>lookupMap.get(key)(...args);
    };
}
