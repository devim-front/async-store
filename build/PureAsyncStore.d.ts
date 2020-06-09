import { AsyncStore } from './AsyncStore';
import { Fn } from './Fn';
/**
 * Хранилище состояния чистой асинхронной функции.
 */
export declare class PureAsyncStore<F extends Fn> extends AsyncStore<F> {
    /**
     * @inheritdoc
     */
    constructor(fn: F);
}
