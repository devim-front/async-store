import { Fn } from './Fn';
/**
 * Содержит методы для работы с функциями.
 */
export declare class Helper {
    /**
     * Возвращает асинхронную функцию, чьи обещания разрешаются в той же
     * последовательности, в которой произошли соответствующие вызовы.
     *
     * @param fn Асинхронная функция.
     */
    static getSafe<F extends Fn>(fn: F): (...args: Parameters<F>) => Promise<import("utility-types").PromiseType<ReturnType<F>>>;
    /**
     * Возвращает true, если массивы эквивалентны друг другу (строго равные
     * элементы находятся в одинаковом порядке).
     *
     * @param valueA Первый массив.
     * @param valueB Второй массив.
     */
    private static isArraysEqual;
    /**
     * Возвращает мемоизованную асинхронную функцию.
     *
     * @param fn Асинхронная функция.
     */
    static getMemoized<F extends Fn>(fn: F): (...args: Parameters<F>) => Promise<import("utility-types").PromiseType<ReturnType<F>>>;
}
