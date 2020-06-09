import { Fn } from './Fn';

/**
 * Аргументы вызова асинхронной функции.
 */
export type Args<F extends Fn> = Parameters<F>;
