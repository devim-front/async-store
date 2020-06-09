import { AsyncStore } from './AsyncStore';

import { Fn } from './Fn';
import { Helper } from './Helper';

/**
 * Хранилище состояния чистой асинхронной функции.
 */
export class PureAsyncStore<F extends Fn> extends AsyncStore<F> {
  /**
   * @inheritdoc
   */
  public constructor(fn: F) {
    const nextFn = Helper.getMemoized(fn) as F;
    super(nextFn);
  }
}
