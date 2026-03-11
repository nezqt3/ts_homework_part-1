/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

type PrimitiveType = "string" | "number" | "boolean";
type Schema = { [key: string]: PrimitiveType };

type TypedObjectFromSchema<S extends Schema> = {
  [K in keyof S]: S[K] extends "string"
    ? string
    : S[K] extends "number"
      ? number
      : boolean;
};

function typedObject<S extends Schema>(schema: S): TypedObjectFromSchema<S> {
  const handler: ProxyHandler<any> = {
    set(target, key: string, value) {
      if (!(key in schema)) {
        throw new Error(`Unexpected key: ${key}`);
      }

      if (typeof value !== schema[key]) {
        throw new Error(`expected: '${schema[key]}' but got '${typeof value}'`);
      }

      return Reflect.set(target, key, value);
    },
  };

  return new Proxy({}, handler);
}

const schema = {
  name: "string",
  age: "number",
} satisfies Schema;

const user = typedObject(schema);

user.name = "Ivan"; // выполнится
user.age = 20; // выполнится

try {
  // Демонстрация ошибки для boolean
  // @ts-expect-error
  user.age = true; // должно выбросить ошибку
} catch (error: unknown) {
  console.error(error);
}

try {
  // Демонстрация ошибки для string
  // @ts-expect-error
  user.age = "20"; // должно выбросить ошибку
} catch (error: unknown) {
  console.error(error);
}
