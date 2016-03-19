# odata-filter-builder




### `undefined`

comparison field lambda expression

### Example

```js
// returns 'tolower(Translation/Ru) eq 'a''
f()
 .eq(x => x.tolower('Translation/Ru'), 'a');
```


**Returns** `string`, 


### `undefined`

comparison rule lambda expression

### Example

```js
// returns '(Type/Id eq 1) and (contains(Name, 'a'))'
f()
 .and(x => x.eq('Type/Id', 1))
 .and(x => x.contains('Name', 'a'));
```


**Returns** `ODataFilterBuilder`, 


### `undefined`

comparison input rule

### Example

```js
f().and(inputRule)
// string
f().and('Id eq 1');
// ODataFilterBuilder
f().and(f().eq('Id', 1));
// ruleLambdaExpression
f().and(x => x.eq('Id', 1));
```


### `undefined`

comparison input field

### Example

```js
// returns 'contains(tolower(Translation/Ru), 'a')
f().contains(inputField, 'a')

// string
f().contains('tolower(Translation/Ru)', 'a');
// fieldLambdaExpression
f().contains(x => x.tolower('Name', ''), 'a');
```


### `_add(source, source.condition, source.rules, rule, [condition])`

Reduce source with new rule and/or condition

### Parameters

| parameter          | type           | description          |
| ------------------ | -------------- | -------------------- |
| `source`           | Object         |                      |
| `source.condition` | string         |                      |
| `source.rules`     | Array          |                      |
| `rule`             | Object\,string |                      |
| `[condition]`      | string         | _optional:_ (and/or) |



**Returns** `Object`, 


### `_not(rule)`

Negate rule

### Parameters

| parameter | type | description |
| --------- | ---- | ----------- |
| `rule`    |      |             |



### `_function(functionName, field, [values])`



### Parameters

| parameter      | type   | description                                |
| -------------- | ------ | ------------------------------------------ |
| `functionName` | string | - function name                            |
| `field`        | string | - field name                               |
| `[values]`     |        | _optional:_ - zero or more function values |



**Returns** `string`, 


### `_compare(field, operator, value)`



### Parameters

| parameter  | type           | description |
| ---------- | -------------- | ----------- |
| `field`    |                |             |
| `operator` | string         |             |
| `value`    | string\,number |             |



**Returns** `string`, 


### `_sourceRuleToString(rule, [wrapInParenthesis=false])`

Convert source rule to string

### Parameters

| parameter                   | type           | description  |
| --------------------------- | -------------- | ------------ |
| `rule`                      | Object\,string |              |
| `[wrapInParenthesis=false]` | boolean        | _optional:_  |



**Returns** `string`, 


### `_inputRuleToString(rule)`

Convert input rule to string

### Parameters

| parameter | type | description |
| --------- | ---- | ----------- |
| `rule`    |      |             |



### `_inputFieldToString(field)`

Convert input field to string if field is lambda expression

### Parameters

| parameter | type | description |
| --------- | ---- | ----------- |
| `field`   |      |             |


### Example

```js
// returns tolower(Name)
_inputFieldToString(x => x.tolower('Name'));
_inputFieldToString('tolower(Name)');
```


### `ODataFilterBuilder([condition='and'])`

Creates a new ODataFilterBuilder instance.
Can be userd without "new" operator

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


### `and`

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


### `or`

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


### `functions`

Canonical Functions


### `length(field)`

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


### `indexof(field, value)`

The indexof function returns the zero-based character position of the first occurrence of the second parameter value in the first parameter value.

### Parameters

| parameter | type   | description |
| --------- | ------ | ----------- |
| `field`   | string |             |
| `value`   | string |             |


### Example

```js
// indexof(CompanyName,'lfreds') eq 1
f().eq(f.func.indexof('CompanyName', 'lfreds'), 1)
```


**Returns** `string`, 


### `_add(rule, [condition=base)`

The 'add' method adds new filter rule with AND or OR condition
if condition not provided. Source condition is used (AND by default)

### Parameters

| parameter         | type   | description            |
| ----------------- | ------ | ---------------------- |
| `rule`            |        |                        |
| `[condition=base` | string | _optional:_ condition] |



**Returns** `ODataFilterBuilder`, 


### `undefined`

Logical Operators


### `and(rule)`

Logical And

### Parameters

| parameter | type | description |
| --------- | ---- | ----------- |
| `rule`    |      |             |



**Returns** `ODataFilterBuilder`, 


### `or(rule)`

Logical Or

### Parameters

| parameter | type | description |
| --------- | ---- | ----------- |
| `rule`    |      |             |



**Returns** `ODataFilterBuilder`, 


### `not(rule)`

Logical Negation

### Parameters

| parameter | type | description |
| --------- | ---- | ----------- |
| `rule`    |      |             |



**Returns** `ODataFilterBuilder`, 


### `_compare(field, operator, value)`

Logical compare field and value by operator

### Parameters

| parameter  | type           | description |
| ---------- | -------------- | ----------- |
| `field`    |                |             |
| `operator` | string         |             |
| `value`    | string\,number |             |



**Returns** `ODataFilterBuilder`, 


### `eq(field, value)`

Equal

### Parameters

| parameter | type           | description  |
| --------- | -------------- | ------------ |
| `field`   |                | - Field Name |
| `value`   | string\,number |              |



**Returns** `ODataFilterBuilder`, 


### `ne(field, value)`

Not Equal

### Parameters

| parameter | type           | description |
| --------- | -------------- | ----------- |
| `field`   |                |             |
| `value`   | string\,number |             |



**Returns** `ODataFilterBuilder`, 


### `gt(field, value)`

Greater Than

### Parameters

| parameter | type           | description |
| --------- | -------------- | ----------- |
| `field`   |                |             |
| `value`   | string\,number |             |



**Returns** `ODataFilterBuilder`, 


### `ge(field, value)`

Greater than or Equal

### Parameters

| parameter | type           | description |
| --------- | -------------- | ----------- |
| `field`   |                |             |
| `value`   | string\,number |             |



**Returns** `ODataFilterBuilder`, 


### `lt(field, value)`

Less Than

### Parameters

| parameter | type           | description |
| --------- | -------------- | ----------- |
| `field`   |                |             |
| `value`   | string\,number |             |



**Returns** `ODataFilterBuilder`, 


### `le(field, value)`

Less than or Equal

### Parameters

| parameter | type           | description |
| --------- | -------------- | ----------- |
| `field`   |                |             |
| `value`   | string\,number |             |



**Returns** `ODataFilterBuilder`, 


### `in(field, values)`



### Parameters

| parameter | type                      | description |
| --------- | ------------------------- | ----------- |
| `field`   |                           |             |
| `values`  | Array\.\<string\>\,string |             |



**Returns** `ODataFilterBuilder`, 


### `notIn(field, values)`



### Parameters

| parameter | type                      | description |
| --------- | ------------------------- | ----------- |
| `field`   |                           |             |
| `values`  | Array\.\<string\>\,string |             |



**Returns** `ODataFilterBuilder`, 


### `undefined`

Canonical Functions


### `contains(field, value)`

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


### `startswith(field, value)`

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


### `endswith(field, value)`

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


### `toString`

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


