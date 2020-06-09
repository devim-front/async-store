import { Value } from './Value';
import { Args } from './Args';
import { Fn } from './Fn';

/**
 * Содержит методы для работы с функциями.
 */
export class Helper {
  /**
   * Возвращает асинхронную функцию, чьи обещания разрешаются в той же
   * последовательности, в которой произошли соответствующие вызовы.
   *
   * @param fn Асинхронная функция.
   */
  public static getSafe<F extends Fn>(fn: F) {
    type V = Value<F>;
    type A = Args<F>;
    type E = Error;

    let previousPromise: Promise<void>;

    return (...args: A) => {
      let value: V;
      let error: E;

      const handleValue = (nextValue: V) => {
        value = nextValue;
        return nextValue;
      };

      const handleError = (nextError: E) => {
        error = nextError;
        return nextError;
      };

      return new Promise<V>((resolve, reject) => {
        const promise = fn(...args).then(handleValue, handleError);
        const all = Promise.all([previousPromise, promise]);

        previousPromise = all.then(() => {
          if (error != null) {
            reject(error);
          } else {
            resolve(value);
          }
        });
      });
    };
  }

  /**
   * Возвращает true, если массивы эквивалентны друг другу (строго равные
   * элементы находятся в одинаковом порядке).
   *
   * @param valueA Первый массив.
   * @param valueB Второй массив.
   */
  private static isArraysEqual(valueA: any[], valueB: any[]) {
    if (valueA == valueB) {
      return true;
    }

    if (valueA == null || valueB == null) {
      return false;
    }

    const { length } = valueA;

    if (length !== valueB.length) {
      return false;
    }

    for (let i = 0; i < length; i += 1) {
      const itemA = valueA[i];
      const itemB = valueB[i];

      if (itemA !== itemB) {
        return false;
      }
    }

    return true;
  }

  /**
   * Возвращает мемоизованную асинхронную функцию.
   *
   * @param fn Асинхронная функция.
   */
  public static getMemoized<F extends Fn>(fn: F) {
    type V = Value<F>;
    type A = Args<F>;
    type E = Error;

    let previousValue: V;
    let previousError: E;
    let previousArgs: A;

    return async (...args: A) => {
      if (this.isArraysEqual(previousArgs, args)) {
        if (previousError != null) {
          throw previousError;
        }

        return previousValue;
      }

      previousArgs = args;

      try {
        previousValue = await fn(...args);
      } catch (error) {
        previousError = error;
        throw previousError;
      }

      return previousValue;
    };
  }
}
