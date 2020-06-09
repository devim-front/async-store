import { Fn } from './Fn';
/**
 * Аргументы вызова асинхронной функции.
 */
export declare type Args<F extends Fn> = Parameters<F>;
