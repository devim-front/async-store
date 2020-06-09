import { FreeStore } from '@devim-front/store';
import { Value } from './Value';
import { Args } from './Args';
import { Fn } from './Fn';
/**
 * Хранилище состояния асинхронной функции.
 */
export declare class AsyncStore<F extends Fn> extends FreeStore {
    /**
     * Создает экземпляр хранилища состояния указанной асинхронной функции.
     *
     * @param fn Функция.
     */
    static create<F extends Fn>(fn: F): AsyncStore<F>;
    /**
     * Асинхронная функция.
     */
    protected fn: F;
    /**
     * Значение, которое было возвращено асинхронной функцией во время её
     * последнего запуска.
     */
    value?: Value<F>;
    /**
     * Ошибка, которая произошла во время последнего запуска асинхронной функции.
     */
    error?: Error;
    /**
     * Указывает, что в данный момент асинхронная функция выполняется.
     */
    isPending: boolean;
    /**
     * Указывает, что в последний раз асинхронная функция завершилась успешно.
     */
    isSuccess: boolean;
    /**
     * Указывает, что в последний раз асинхронная функция завершилась с ошибкой.
     */
    isFailure: boolean;
    /**
     * Указывает, что выполнение асинхронной функции было завершено (с ошибкой
     * или без).
     */
    get isDone(): boolean;
    /**
     * Создает экземпляр хранилища для указанной функции.
     *
     * @param fn Асинхронная функция.
     */
    constructor(fn: F);
    /**
     * Указывает, что асинхроная функция начала выполняться.
     */
    private setPending;
    /**
     * Указывает, что асинхронная функция завершилась успешно.
     *
     * @param value Результат выполнения асинхронной функции.
     */
    private setValue;
    /**
     * Указывает, что асинхронная функция завершилась с ошибкой.
     *
     * @param error Ошибка.
     */
    private setError;
    /**
     * Выполняет асинхронную функцию и возвращает её результат.
     *
     * @param args Аргументы.
     */
    call(...args: Args<F>): Promise<import("utility-types").PromiseType<ReturnType<F>>>;
    /**
     * @inheritdoc
     */
    dispose(): void;
}
