# [OData Filter Builder](https://bodia-uz.github.io/odata-filter-builder)

## Documentation
* [`ODataFilterBuilder`](https://bodia-uz.github.io/odata-filter-builder/ODataFilterBuilder.html) - logical operators
* [`ODataFilterBuilder.filters`](https://bodia-uz.github.io/odata-filter-builder/ODataFilterBuilder.js.html) - canonical functions

## Installation

The fastest way to get started is to serve JavaScript from the [npmcdn](https://npmcdn.com):

```html
<!-- NOTE: See https://npmcdn.com how to use specific vesion. -->
<!-- NOTE: not minified version - https://npmcdn.com/odata-filter-builder@^0.0/dist/odata-filter-builder.js -->
<script src="https://npmcdn.com/odata-filter-builder@^0.0/dist/odata-filter-builder.min.js"></script>
```

```js
// now you can find the library on window.ODataFilterBuilder
var f = ODataFilterBuilder;
```

If you'd like to use [bower](http://bower.io):

```sh
$ bower install --save https://npmcdn.com/odata-filter-builder@^0.0/dist/odata-filter-builder.js --save
```

And it's just as easy with [npm](http://npmjs.com):

```sh
$ npm i --save odata-filter-builder
```
```js
// using ES6 modules
import f from 'odata-filter-builder';
```
```js
// using CommonJS modules
var f = require('odata-filter-builder');
```

Also you can try it [in your browser](https://jsbin.com/lafutap/edit?html,js,console)

## How to use

### `f([condition='and'])`

Constructor for [`ODataFilterBuilder`](https://bodia-uz.github.io/odata-filter-builder/ODataFilterBuilder.html) class. Create new instance of filter builder.
Can be used without `new` operator.

| parameter           | type   | description                                |
| ------------------- | ------ | ------------------------------------------ |
| `[condition='and']` | string | _optional:_ base condition ('and'/'or'). |

**Examples**
```js
// can be used without "new" operator
// default base condition is 'and'
f()
 .eq('TypeId', '1')
 .contains(x => x.toLower('Name'), 'a')
 .toString();
// (TypeId eq '1') and (contains(tolower(Name), 'a'))
```
```js
// there are different constructors for 'and' as base condition
// f(), f('and') and f.and()
f('and')
 .eq('Type/Id', 3)
 .eq(x => x.concat(y => y.concat('City',', '), 'Country', false), 'Berlin, Germany')
 .toString();
// (Type/Id eq 3) and (concat(concat(City, ', '), Country) eq 'Berlin, Germany')
```

### `f.or()`

[`ODataFilterBuilder`](https://bodia-uz.github.io/odata-filter-builder/ODataFilterBuilder.html)
constructor alias.
Same as  `f('or')`.
Creates a new OData filter builder with `'or'` as base condition.

**Examples**

```js
// 'or' condition as base condition
f('or')
  .eq(x => x.toLower('Name'), 'foo')
  .eq(x => x.toLower('Name'), 'bar')
  .toString();
// (tolower(Name) eq 'foo') or (tolower(Name) eq 'bar')
```
```js
// combination of 'or' and 'and'
f('or')
  .contains(x => x.toLower('Name'), 'google')
  .contains(x => x.toLower('Name'), 'yandex')
  .and(x => x.eq('Type/Name', 'Search Engine'))
  .toString();
// ((contains(tolower(Name), 'google')) or (contains(tolower(Name), 'yandex'))) and (Type/Name eq 'Search Engine')
```

### More examples
You can find more examples in [test/ODataFilterBuilder_spec.js](https://github.com/bodia-uz/odata-filter-builder/blob/master/test/ODataFilterBuilder_spec.js)

## Build your copy

Clone [repository](https://github.com/bodia-uz/odata-filter-builder) and use npm scripts


### Tests

```sh
$ npm test
$ npm run test:watch
$ npm run test:cov
$ npm run lint
```

### Build

```sh
$ npm run build
```

### JSDoc

```sh
$ npm run jsdoc
```


