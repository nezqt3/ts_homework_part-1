/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

type PrimitiveArg = string | number;

function memoize<Args extends PrimitiveArg[], R>(
  fn: (...args: Args) => R,
): (...args: Args) => R {
  const cache = new Map<string, R>();

  return function (this: unknown, ...args: Args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
}

const slowAdd = (a: number, b: number): number => {
  return a + b;
};

type Obj = {
  value: number;
  add(a: number): number;
  memoAdd?: (a: number) => number;
};

const obj: Obj = {
  value: 10,
  add(a) {
    return this.value + a;
  },
};

const memoAdd = memoize(slowAdd);
memoAdd(1, 2); // возвращает 3
memoAdd(1, 2); // из кэша, возвращает 3
obj.memoAdd = memoize(obj.add);

if (obj.memoAdd) {
  console.log(obj.memoAdd(5));
  console.log(obj.memoAdd(5));
}
