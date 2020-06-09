import { PromiseType } from 'utility-types';

import { Fn } from './Fn';

/**
 * Значение, которое возвращает асинхронная функция.
 */
export type Value<F extends Fn> = PromiseType<ReturnType<F>>;
