# vue-computed-helpers

[![NPM version](https://img.shields.io/npm/v/vue-computed-helpers.svg?style=flat)](https://npmjs.org/package/vue-computed-helpers)
[![Build Status](https://travis-ci.org/michalsnik/vue-computed-helpers.svg?branch=master)](https://travis-ci.org/michalsnik/vue-computed-helpers)

> This package contains bunch of useful helpers that can be used to simplify computed properties

## :cd: Installation

Via npm:
```
npm install vue-computed-helpers --save
```

Via yarn:
```
yarn add vue-computed-helpers
```

## :rocket: Usage

```js
import { eq, count, countBy } from 'vue-computed-helpers'

export default {
  data() {
    return {
      todos: [
        { title: 'Clean house', done: false },
        { title: 'Buy beer', done: true },
        { title: 'Watch GoT', done: true }
      ]
    }
  },
  computed: {
    allTodosCount: count('todos'), // 3
    completedCount: countBy('todos', 'done', true), // 2
    allCompleted: eq('completedCount', 'allTodosCount') // false
  }
}
```

## :star: Helpers

| Helper | Usage | Variable argument count allowed |
|:-------|:------|:--------------------------------|
| eq | `eq('anyProperty', x)` | no |
| notEq | `notEq('anyProperty', x)` | no|
| not | `not('anyProperty', 'anotherProp', ...)` | yes |
| and | `and('anyProperty', 'anotherProp', ...)` | yes |
| or | `or('anyProperty', 'anotherProp', ...)` | yes |
| xor | `xor('anyProperty', 'anotherProp')` | no |
| gt | `gt('numProperty', x)` | no |
| gte | `gte('numProperty', x)` | no |
| lt | `lt('numProperty', x)` | no |
| lte | `lte('numProperty', x)` | no |
| sum | `sum('numProperty', x, ...)` | yes |
| alias | `alias('anyProperty')` | no |
| bool | `bool('anyProperty')` | no |
| empty | `empty('anyProperty')` | no |
| min | `min('arrayProperty')` | no |
| max | `max('arrayProperty')` | no |
| filter | `filter('arrayProperty', (el) => el.done === true)` | no |
| filterBy | `filterBy('arrayProperty', 'done', true)` | no |
| find | `find('arrayProperty', (el) => el.id === 5)` | no |
| findBy | `findBy('arrayProperty', 'id', 5)` | no |
| map | `map('arrayProperty', (el) => el.id)` | no |
| mapBy | `mapBy('arrayProperty', 'id')` | no |
| count | `count('arrayProperty')` | no |
| countBy | `countBy('arrayProperty', 'done', true)` | no |
| classObject | `classObject('isPrimary', 'has-title:title', 'wide')` | yes |
| byIndex | `byIndex('arrayProperty', 0)` | no |

`x` means that it can be either value or property name. If you provide a string and there will be a property with that name it's value will be used to perform the check.

## :mag: Detailed usage of some helpers

### classObject

Example code:
```js
import { classObject } from 'vue-computed-helpers'

export default {
  props: ['isPrimary', 'title', 'wide']
  computed: {
    classObj: classObject('isPrimary', 'has-title:title', 'wide')
  }
}
```

Given all above props are set and truthy, this computed property will return the following object:
```js
{
  'is-primary': true,
  'has-title': true,
  'wide': true
}
```

Which can be used in template:
```html
<template>
  <div :class="classObj">
  </div>
</template>
```

## :lock: License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).
