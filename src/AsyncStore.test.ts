import { assert } from 'chai';

import { AsyncStore } from './AsyncStore';

describe('AsyncStore', () => {
  const timeout = (delay: number, value: any) =>
    new Promise<any>((resolve, reject) => {
      let callback = () => resolve(value);

      if (value instanceof Error) {
        callback = () => reject(value);
      }

      setTimeout(callback, delay);
    });

  describe('isPending', () => {
    it('should be true if the function is running', () => {
      const store = AsyncStore.create(timeout);
      const promise = store.call(1, 'foo');
      assert.isTrue(store.isPending);
      return promise;
    });

    it('should be false if the function is finised', async () => {
      const store = AsyncStore.create(timeout);
      await store.call(1, 'foo');
      assert.isFalse(store.isPending);
    });
  });

  describe('isSuccess', () => {
    it('should be true if the function completed successfully', async () => {
      const store = AsyncStore.create(timeout);
      await store.call(1, 'foo');
      assert.isTrue(store.isSuccess);
    });

    it('should be false if the function completed with error', async () => {
      const store = AsyncStore.create(timeout);

      try {
        await store.call(1, new Error());
      } catch (error) {}

      assert.isFalse(store.isSuccess);
    });
  });

  describe('isFailure', () => {
    it('should be true if the function completed with error', async () => {
      const store = AsyncStore.create(timeout);
      try {
        await store.call(1, new Error());
      } catch (error) {}
      assert.isTrue(store.isFailure);
    });

    it('should be false if the function completed successfully', async () => {
      const store = AsyncStore.create(timeout);
      store.call(1, 'foo');
      assert.isFalse(store.isFailure);
    });
  });

  describe('isDone', () => {
    it('should be true if the function completed', async () => {
      const store = AsyncStore.create(timeout);
      await store.call(1, 'foo');
      assert.isTrue(store.isDone);

      try {
        await store.call(1, new Error());
      } catch (error) {}

      assert.isTrue(store.isDone);
    });
  });

  describe('value', () => {
    it("should be equal to last function's result", async () => {
      const store = AsyncStore.create(timeout);
      const valueA = 1;
      const valueB = await store.call(1, valueA);
      assert.strictEqual(store.value, valueA);
      assert.strictEqual(valueB, valueA);
    });

    it("should be equal to last function's result even if the function has been invoked again", async () => {
      const store = AsyncStore.create(timeout);
      const valueA = 1;
      const valueB = 2;
      await store.call(1, valueA);
      const promise = store.call(1, valueB);
      assert.strictEqual(store.value, valueA);
      return promise;
    });
  });

  describe('error', () => {
    it("should be equal to last function's error", async () => {
      const store = AsyncStore.create(timeout);
      try {
        await store.call(1, new Error());
      } catch (error) {}
      assert.isTrue(store.error instanceof Error);
    });

    it("should be equal to last function's error even if the function has been invoked again", async () => {
      const store = AsyncStore.create(timeout);
      try {
        await store.call(1, new Error());
      } catch (error) {}
      const promise = store.call(1, 1);
      assert.isTrue(store.error instanceof Error);
      return promise;
    });
  });

  describe('call', () => {
    it('should passes the arguments into wrapped function', async () => {
      const store = AsyncStore.create(timeout);
      const valueA = 'foo';
      const valueB = await store.call(1, valueA);
      assert.equal(valueB, valueA);
    });

    it('results of the call should be resolved by order', async () => {
      const store = AsyncStore.create(timeout);

      const promises: Promise<void>[] = [];
      const origins: number[] = [];
      const results: number[] = [];
      const max = 10;

      for (let i = 0; i < max; i += 1) {
        const delay = max - i;
        const value = i;

        origins.push(value);

        const promise = store.call(delay, value).then((value) => {
          results.push(value);
        });

        promises.push(promise);
      }

      await Promise.all(promises);
      assert.sameOrderedMembers(origins, results);
    });
  });
});
