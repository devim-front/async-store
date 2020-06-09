import { assert } from 'chai';

import { PureAsyncStore } from './PureAsyncStore';

describe('PureAsyncStore', () => {
  describe('call', () => {
    it('should invokes the wrapped function just one time with same args', async () => {
      const needleCount = 3;
      let count = 0;

      const fn = async (..._args: any[]) => {
        count += 1;
      };

      const store = PureAsyncStore.create(fn);
      const promises: Promise<void>[] = [];

      for (let i = 0; i < needleCount; i += 1) {
        for (let j = 0; j < 10; j += 1) {
          promises.push(store.call(i));
        }
      }

      await Promise.all(promises);

      assert.equal(count, needleCount);
    });
  });
});
