type PrimitiveArg = string | number;
declare function memoize<Args extends PrimitiveArg[], R>(fn: (...args: Args) => R): (...args: Args) => R;
declare const slowAdd: (a: number, b: number) => number;
type Obj = {
    value: number;
    add(a: number): number;
    memoAdd?: (a: number) => number;
};
declare const obj: Obj;
declare const memoAdd: (a: number, b: number) => number;
