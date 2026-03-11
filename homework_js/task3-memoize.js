/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
}

const slowAdd = (a, b) => {
  return a + b;
};

const obj = {
  value: 10,
  add(a) {
    return this.value + a;
  },
};

const memoAdd = memoize(slowAdd);
memoAdd(1, 2); // возвращает 3
memoAdd(1, 2); // из кэша, возвращает 3
obj.memoAdd = memoize(obj.add);

console.log(obj.memoAdd(5));
console.log(obj.memoAdd(5));
