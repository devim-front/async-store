import { PromiseType } from 'utility-types';
import { Fn } from './Fn';
/**
 * Значение, которое возвращает асинхронная функция.
 */
export declare type Value<F extends Fn> = PromiseType<ReturnType<F>>;
