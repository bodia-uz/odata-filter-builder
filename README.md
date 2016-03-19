# OData Filter Builder

## Constructors

### `ODataFilterBuilder([condition='and'])`

Creates a new ODataFilterBuilder instance.
Can be userd without "new" operator.

Use short name as alias.
```js
const f = ODataFilterBuilder;
// returns "(Id eq 1) and (Foo eq 'Bar')"
f()
  .eq('Id', 1)
  .eq('Foo', 'Bar');
```

### Parameters

| parameter           | type   | description                            |
| ------------------- | ------ | -------------------------------------- |
| `[condition='and']` | string | _optional:_ - base condition (and/or). |


### Example

```js
// use short name as alias
const f = ODataFilterBuilder;
// can be used without "new" operator
// return Id eq '1'
f().eq('Id', '1');
```


**Returns** `ODataFilterBuilder`, 


### `f.and()`

Creates new OData filter builder with AND as base condition

### Example

```js
// return '(a eq 1) and (b eq 2)'
f.and()
 .eq('a', 1)
 .eq('b', 2)
 .toString();
```


**Returns** `ODataFilterBuilder`, returns new ODataFilterBuilder instance with AND as base condition


### `f.or()`

Create new OData filter builder with OR as base condition

### Example

```js
// return '(a eq 1) or (b eq 2)'
f.or()
 .eq('a', 1)
 .eq('b', 2)
 .toString();
```


**Returns** `ODataFilterBuilder`, returns new ODataFilterBuilder instance with OR as base condition


## `ODataFilterBuilder` Static Canonical Functions

### `f.functions.length(field)`

The length function returns the number of characters in the parameter value.

### Parameters

| parameter | type   | description |
| --------- | ------ | ----------- |
| `field`   | string |             |


### Example

```js
// return length(CompanyName) eq 19
f().eq(x => x.length('CompanyName'), 19)
```


**Returns** `string`, 


### `f.functions.indexof(field, value)`

The indexof function returns the zero-based character position of the first occurrence of the second parameter value in the first parameter value.

### Parameters

| parameter | type   | description |
| --------- | ------ | ----------- |
| `field`   | string |             |
| `value`   | string |             |


### Example

```js
// indexof(CompanyName,'lfreds') eq 1
f().eq(f.functions.indexof('CompanyName', 'lfreds'), 1)
```


**Returns** `string`, 

## `ODataFilterBuilder.prototype` Logical Operators


### `f().and(rule)`

Logical And

### Parameters

| parameter | type | description |
| --------- | ---- | ----------- |
| `rule`    |      |             |



**Returns** `ODataFilterBuilder`, 


### `f().or(rule)`

Logical Or

### Parameters

| parameter | type | description |
| --------- | ---- | ----------- |
| `rule`    |      |             |



**Returns** `ODataFilterBuilder`, 


### `f().not(rule)`

Logical Negation

### Parameters

| parameter | type | description |
| --------- | ---- | ----------- |
| `rule`    |      |             |



**Returns** `ODataFilterBuilder`, 


### `f().eq(field, value)`

Equal

### Parameters

| parameter | type           | description  |
| --------- | -------------- | ------------ |
| `field`   |                | - Field Name |
| `value`   | string\,number |              |



**Returns** `ODataFilterBuilder`, 


### `f().ne(field, value)`

Not Equal

### Parameters

| parameter | type           | description |
| --------- | -------------- | ----------- |
| `field`   |                |             |
| `value`   | string\,number |             |



**Returns** `ODataFilterBuilder`, 


### `f().gt(field, value)`

Greater Than

### Parameters

| parameter | type           | description |
| --------- | -------------- | ----------- |
| `field`   |                |             |
| `value`   | string\,number |             |



**Returns** `ODataFilterBuilder`, 


### `f().ge(field, value)`

Greater than or Equal

### Parameters

| parameter | type           | description |
| --------- | -------------- | ----------- |
| `field`   |                |             |
| `value`   | string\,number |             |



**Returns** `ODataFilterBuilder`, 


### `f().lt(field, value)`

Less Than

### Parameters

| parameter | type           | description |
| --------- | -------------- | ----------- |
| `field`   |                |             |
| `value`   | string\,number |             |



**Returns** `ODataFilterBuilder`, 


### `f().le(field, value)`

Less than or Equal

### Parameters

| parameter | type           | description |
| --------- | -------------- | ----------- |
| `field`   |                |             |
| `value`   | string\,number |             |



**Returns** `ODataFilterBuilder`, 


### `f().in(field, values)`



### Parameters

| parameter | type                      | description |
| --------- | ------------------------- | ----------- |
| `field`   |                           |             |
| `values`  | Array\.\<string\>\,string |             |



**Returns** `ODataFilterBuilder`, 


### `f().notIn(field, values)`



### Parameters

| parameter | type                      | description |
| --------- | ------------------------- | ----------- |
| `field`   |                           |             |
| `values`  | Array\.\<string\>\,string |             |



**Returns** `ODataFilterBuilder`, 


## `ODataFilterBuilder.prototype` Canonical Functions


### `f().contains(field, value)`

The contains function returns true if the second parameter string value is a substring of the first parameter string value.

### Parameters

| parameter | type   | description |
| --------- | ------ | ----------- |
| `field`   |        |             |
| `value`   | string |             |


### Example

```js
// return contains(CompanyName, 'Alfreds')
```


**Returns** `ODataFilterBuilder`, 


### `f().startswith(field, value)`

The startswith function returns true if the first parameter string value starts with the second parameter string value.

### Parameters

| parameter | type   | description |
| --------- | ------ | ----------- |
| `field`   |        |             |
| `value`   | string |             |


### Example

```js
// return startswith(CompanyName,'Alfr')
```


**Returns** `ODataFilterBuilder`, 


### `f().endswith(field, value)`

The endswith function returns true if the first parameter string value ends with the second parameter string value.

### Parameters

| parameter | type   | description |
| --------- | ------ | ----------- |
| `field`   |        |             |
| `value`   | string |             |


### Example

```js
// return endswith(CompanyName,'Futterkiste')
```


**Returns** `ODataFilterBuilder`, 


### `f().toString`

Convert filter builder instance to string


**Returns** `string`, 

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install odata-filter-builder
```

## Tests

```sh
$ npm test
```


