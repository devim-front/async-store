[@devim-front/async-store](../README.md) › [Helper](helper.md)

# Class: Helper

Содержит методы для работы с функциями.

## Hierarchy

* **Helper**

## Index

### Methods

* [getMemoized](helper.md#markdown-header-static-getmemoized)
* [getSafe](helper.md#markdown-header-static-getsafe)

## Methods

### <a id="markdown-header-static-getmemoized" name="markdown-header-static-getmemoized"></a> `Static` getMemoized

▸ **getMemoized**‹**F**›(`fn`: F): *(Anonymous function)*

Возвращает мемоизованную асинхронную функцию.

**Type parameters:**

▪ **F**: *[Fn](../README.md#markdown-header-fn)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fn` | F | Асинхронная функция.  |

**Returns:** *(Anonymous function)*

___

### <a id="markdown-header-static-getsafe" name="markdown-header-static-getsafe"></a> `Static` getSafe

▸ **getSafe**‹**F**›(`fn`: F): *(Anonymous function)*

Возвращает асинхронную функцию, чьи обещания разрешаются в той же
последовательности, в которой произошли соответствующие вызовы.

**Type parameters:**

▪ **F**: *[Fn](../README.md#markdown-header-fn)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fn` | F | Асинхронная функция.  |

**Returns:** *(Anonymous function)*
