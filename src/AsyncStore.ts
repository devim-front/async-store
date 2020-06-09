import { FreeStore } from '@devim-front/store';
import { observable, action, computed } from 'mobx';

import { Helper } from './Helper';
import { Value } from './Value';
import { Args } from './Args';
import { Fn } from './Fn';

/**
 * Хранилище состояния асинхронной функции.
 */
export class AsyncStore<F extends Fn> extends FreeStore {
  /**
   * Создает экземпляр хранилища состояния указанной асинхронной функции.
   *
   * @param fn Функция.
   */
  public static create<F extends Fn>(fn: F) {
    return new this(fn);
  }

  /**
   * Асинхронная функция.
   */
  protected fn: F;

  /**
   * Значение, которое было возвращено асинхронной функцией во время её
   * последнего запуска.
   */
  @observable
  public value?: Value<F>;

  /**
   * Ошибка, которая произошла во время последнего запуска асинхронной функции.
   */
  @observable
  public error?: Error;

  /**
   * Указывает, что в данный момент асинхронная функция выполняется.
   */
  @observable
  public isPending: boolean = false;

  /**
   * Указывает, что в последний раз асинхронная функция завершилась успешно.
   */
  @observable
  public isSuccess: boolean = false;

  /**
   * Указывает, что в последний раз асинхронная функция завершилась с ошибкой.
   */
  @observable
  public isFailure: boolean = false;

  /**
   * Указывает, что выполнение асинхронной функции было завершено (с ошибкой
   * или без).
   */
  @computed
  public get isDone() {
    return this.isSuccess || this.isFailure;
  }

  /**
   * Создает экземпляр хранилища для указанной функции.
   *
   * @param fn Асинхронная функция.
   */
  public constructor(fn: F) {
    super();
    this.fn = Helper.getSafe(fn) as F;
  }

  /**
   * Указывает, что асинхроная функция начала выполняться.
   */
  @action
  private setPending() {
    this.isPending = true;
  }

  /**
   * Указывает, что асинхронная функция завершилась успешно.
   *
   * @param value Результат выполнения асинхронной функции.
   */
  @action
  private setValue(value: Value<F>) {
    this.isPending = false;
    this.isSuccess = true;
    this.isFailure = false;

    this.value = value;
    this.error = undefined;
  }

  /**
   * Указывает, что асинхронная функция завершилась с ошибкой.
   *
   * @param error Ошибка.
   */
  @action
  private setError(error: Error) {
    this.isPending = false;
    this.isSuccess = false;
    this.isFailure = true;

    this.value = undefined;
    this.error = error;
  }

  /**
   * Выполняет асинхронную функцию и возвращает её результат.
   *
   * @param args Аргументы.
   */
  public async call(...args: Args<F>) {
    this.setPending();

    let value: Value<F>;

    try {
      value = await this.fn(...args);
    } catch (error) {
      this.setError(error);
      throw error;
    }

    this.setValue(value);
    return value;
  }

  /**
   * @inheritdoc
   */
  public dispose() {
    super.dispose();

    this.value = undefined;
    this.error = undefined;

    this.isSuccess = false;
    this.isFailure = false;
    this.isPending = false;
  }
}
