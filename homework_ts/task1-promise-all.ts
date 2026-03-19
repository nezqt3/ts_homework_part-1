/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll<T>(promises: Array<Promise<T>>): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const result: T[] = [];
    let count: number = 0;
    const total: number = promises.length;

    if (total === 0) {
      resolve([]);
      return;
    }

    promises.forEach((promise, i) => {
      Promise.resolve(promise)
        .then((value: T) => {
          result[i] = value;
          count++;
          if (count === total) {
            resolve(result);
          }
        })
        .catch((error: unknown) => {
          reject(error);
        });
    });
  });
}

const promiseFirst = Promise.resolve(1);
const promiseSecond = Promise.resolve(2);

promiseAll([promiseFirst, promiseSecond]).then(console.log); // [1, 2]
