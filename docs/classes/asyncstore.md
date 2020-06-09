[@devim-front/async-store](../README.md) › [AsyncStore](asyncstore.md)

# Class: AsyncStore ‹**F, E**›

Хранилище состояния асинхронной функции.

## Type parameters

▪ **F**: *[Fn](../README.md#markdown-header-fn)*

▪ **E**: *StoreEvents*

## Hierarchy

* FreeStore

  ↳ **AsyncStore**

  ↳ [PureAsyncStore](pureasyncstore.md)

## Index

### Constructors

* [constructor](asyncstore.md#markdown-header-constructor)

### Properties

* [error](asyncstore.md#markdown-header-optional-error)
* [fn](asyncstore.md#markdown-header-protected-fn)
* [isFailure](asyncstore.md#markdown-header-isfailure)
* [isPending](asyncstore.md#markdown-header-ispending)
* [isSuccess](asyncstore.md#markdown-header-issuccess)
* [value](asyncstore.md#markdown-header-optional-value)

### Accessors

* [isDone](asyncstore.md#markdown-header-isdone)

### Methods

* [call](asyncstore.md#markdown-header-call)
* [dispose](asyncstore.md#markdown-header-dispose)
* [emit](asyncstore.md#markdown-header-protected-emit)
* [off](asyncstore.md#markdown-header-off)
* [on](asyncstore.md#markdown-header-on)
* [create](asyncstore.md#markdown-header-static-create)

## Constructors

### <a id="markdown-header-constructor" name="markdown-header-constructor"></a>  constructor

\+ **new AsyncStore**(`fn`: F): *[AsyncStore](asyncstore.md)*

Создает экземпляр хранилища для указанной функции.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fn` | F | Асинхронная функция.  |

**Returns:** *[AsyncStore](asyncstore.md)*

## Properties

### <a id="markdown-header-optional-error" name="markdown-header-optional-error"></a> `Optional` error

• **error**? : *Error*

Ошибка, которая произошла во время последнего запуска асинхронной функции.

___

### <a id="markdown-header-protected-fn" name="markdown-header-protected-fn"></a> `Protected` fn

• **fn**: *F*

Асинхронная функция.

___

### <a id="markdown-header-isfailure" name="markdown-header-isfailure"></a>  isFailure

• **isFailure**: *boolean* = false

Указывает, что в последний раз асинхронная функция завершилась с ошибкой.

___

### <a id="markdown-header-ispending" name="markdown-header-ispending"></a>  isPending

• **isPending**: *boolean* = false

Указывает, что в данный момент асинхронная функция выполняется.

___

### <a id="markdown-header-issuccess" name="markdown-header-issuccess"></a>  isSuccess

• **isSuccess**: *boolean* = false

Указывает, что в последний раз асинхронная функция завершилась успешно.

___

### <a id="markdown-header-optional-value" name="markdown-header-optional-value"></a> `Optional` value

• **value**? : *[Value](../README.md#markdown-header-value)‹F›*

Значение, которое было возвращено асинхронной функцией во время её
последнего запуска.

## Accessors

### <a id="markdown-header-isdone" name="markdown-header-isdone"></a>  isDone

• **get isDone**(): *boolean*

Указывает, что выполнение асинхронной функции было завершено (с ошибкой
или без).

**Returns:** *boolean*

## Methods

### <a id="markdown-header-call" name="markdown-header-call"></a>  call

▸ **call**(...`args`: [Args](../README.md#markdown-header-args)‹F›): *Promise‹F extends function ? R : any extends Promise<U> ? U : never›*

Выполняет асинхронную функцию и возвращает её результат.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...args` | [Args](../README.md#markdown-header-args)‹F› | Аргументы.  |

**Returns:** *Promise‹F extends function ? R : any extends Promise<U> ? U : never›*

___

### <a id="markdown-header-dispose" name="markdown-header-dispose"></a>  dispose

▸ **dispose**(): *void*

*Overrides void*

**`inheritdoc`** 

**Returns:** *void*

___

### <a id="markdown-header-protected-emit" name="markdown-header-protected-emit"></a> `Protected` emit

▸ **emit**‹**T**›(`event`: T, ...`args`: Parameters‹E[T]›): *void*

*Inherited from [AsyncStore](asyncstore.md).[emit](asyncstore.md#markdown-header-protected-emit)*

Вызывает указанное событие, передавая аргументы в его обработчики.

**Type parameters:**

▪ **T**: *keyof E*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | T | Событие. |
`...args` | Parameters‹E[T]› | Аргументы, передаваемые в обработчики.  |

**Returns:** *void*

___

### <a id="markdown-header-off" name="markdown-header-off"></a>  off

▸ **off**‹**T**›(`event`: T, `handler`: E[T]): *void*

*Inherited from [AsyncStore](asyncstore.md).[off](asyncstore.md#markdown-header-off)*

Удаляет указанный обработчик события.

**Type parameters:**

▪ **T**: *keyof E*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | T | Событие. |
`handler` | E[T] | Обработчик.  |

**Returns:** *void*

___

### <a id="markdown-header-on" name="markdown-header-on"></a>  on

▸ **on**‹**T**›(`event`: T, `handler`: E[T]): *void*

*Inherited from [AsyncStore](asyncstore.md).[on](asyncstore.md#markdown-header-on)*

Добавляет обработчик указанному событию.

**Type parameters:**

▪ **T**: *keyof E*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | T | Событие. |
`handler` | E[T] | Обработчик.  |

**Returns:** *void*

___

### <a id="markdown-header-static-create" name="markdown-header-static-create"></a> `Static` create

▸ **create**‹**F**›(`fn`: F): *[AsyncStore](asyncstore.md)‹F›*

Создает экземпляр хранилища состояния указанной асинхронной функции.

**Type parameters:**

▪ **F**: *[Fn](../README.md#markdown-header-fn)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fn` | F | Функция.  |

**Returns:** *[AsyncStore](asyncstore.md)‹F›*
