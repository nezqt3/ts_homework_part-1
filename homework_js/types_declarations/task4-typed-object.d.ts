type PrimitiveType = "string" | "number" | "boolean";
type Schema = {
    [key: string]: PrimitiveType;
};
type TypedObjectFromSchema<S extends Schema> = {
    [K in keyof S]: S[K] extends "string" ? string : S[K] extends "number" ? number : boolean;
};
declare function typedObject<S extends Schema>(schema: S): TypedObjectFromSchema<S>;
declare const schema: {
    name: "string";
    age: "number";
};
declare const user: TypedObjectFromSchema<{
    name: "string";
    age: "number";
}>;
