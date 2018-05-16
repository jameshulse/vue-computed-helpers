import { kebabCase } from './utils'

export function eq(arg1, arg2) {
  return function() {
    return this[arg1] === (this[arg2] || arg2)
  }
}

export function notEq(arg1, arg2) {
  return function() {
    return this[arg1] !== (this[arg2] || arg2)
  }
}

export function not(...args) {
  return function() {
    return args.every(arg => !this[arg])
  }
}

export function and(...args) {
  return function() {
    return args.every(arg => this[arg])
  }
}

export function or(...args) {
  return function() {
    return args.some(arg => this[arg])
  }
}

export function xor(arg1, arg2) {
  return function() {
    return (this[arg1] && !this[arg2]) || (this[arg2] && !this[arg1])
  }
}

export function gt(arg1, arg2) {
  return function() {
    return this[arg1] > (this[arg2] || arg2)
  }
}

export function gte(arg1, arg2) {
  return function() {
    return this[arg1] >= (this[arg2] || arg2)
  }
}

export function lt(arg1, arg2) {
  return function() {
    return this[arg1] < (this[arg2] || arg2)
  }
}

export function lte(arg1, arg2) {
  return function() {
    return this[arg1] <= (this[arg2] || arg2)
  }
}

export function sum(...args) {
  return function() {
    const firstArg = this[args[0]]

    // First argument is an array
    if (args.length === 1 && Array.isArray(firstArg)) {
      return firstArg.reduce((acc, num) => acc + num, 0)
    }

    // One of passed arguments is not a number
    if (args.some(arg => !Number.isFinite(arg) && !Number.isFinite(this[arg]))) {
      console.assert(true, 'One of passed properties to "sum" helper is not a number')
      return 0
    }

    return args
      .reduce(
        (acc, arg) => acc + (this[arg] || arg),
        0
      )
  }
}

export function alias(arg) {
  return function() {
    return this[arg]
  }
}

export function bool(arg) {
  return function() {
    return Boolean(this[arg])
  }
}

export function empty(arg) {
  return function() {
    return !this[arg] || this[arg].length === 0
  }
}

export function max(arg) {
  return function() {
    const isArray = Array.isArray(this[arg])
    console.assert(isArray, 'computed helper "max" requires property of array type')
    return isArray ? this[arg].sort((a, b) => a < b)[0] : 0
  }
}

export function min(arg) {
  return function() {
    const isArray = Array.isArray(this[arg])
    console.assert(isArray, 'computed helper "min" requires property of array type')
    return isArray ? this[arg].sort((a, b) => a > b)[0] : 0
  }
}

export function filter(arg, fn) {
  return function() {
    const isArray = Array.isArray(this[arg])
    console.assert(isArray, 'computed helper "filter" requires property of array type')
    return isArray ? this[arg].filter(fn) : []
  }
}

export function filterBy(arg, key, value) {
  return function() {
    const isArray = Array.isArray(this[arg])
    console.assert(isArray, 'computed helper "filterBy" requires property of array type')
    if (!isArray) return []
    return this[arg]
      .filter((item) => {
        return typeof item[key] !== undefined && item[key] === value
      })
  }
}

export function find(arg, fn) {
  return function() {
    const isArray = Array.isArray(this[arg])
    console.assert(isArray, 'computed helper "find" requires property of array type')
    return isArray ? this[arg].find(fn) : undefined
  }
}

export function findBy(arg, key, value) {
  return function() {
    const isArray = Array.isArray(this[arg])
    console.assert(isArray, 'computed helper "findBy" requires property of array type')
    if (!isArray) return undefined
    return this[arg]
      .find((item) => {
        return typeof item[key] !== undefined && item[key] === value
      })
  }
}

export function map(arg, fn) {
  return function() {
    const isArray = Array.isArray(this[arg])
    console.assert(isArray, 'computed helper "map" requires property of array type')
    return isArray ? this[arg].map(fn) : []
  }
}

export function mapBy(arg, key) {
  return function() {
    const isArray = Array.isArray(this[arg])
    console.assert(isArray, 'computed helper "map" requires property of array type')
    return isArray ? this[arg].map(item => item[key]) : []
  }
}

export function count(arg) {
  return function() {
    const isArray = Array.isArray(this[arg])
    console.assert(isArray, 'computed helper "count" requires property of array type')
    if (!isArray) return 0
    return this[arg].length
  }
}

export function countBy(arg, key, value) {
  return function() {
    const isArray = Array.isArray(this[arg])
    console.assert(isArray, 'computed helper "countBy" requires property of array type')
    if (!isArray) return 0
    return this[arg].filter(item => item[key] && item[key] === value).length
  }
}

export function classObject(...args) {
  return function() {
    const hasProperArgs = args.every(arg => typeof arg === 'string')
    console.assert(hasProperArgs, 'computed helper "classObject" requires arguments of string type')

    return args.reduce((acc, arg) => {
      let className = kebabCase(arg)
      let prop = arg

      if (arg.indexOf(':') > 0) {
        [className, prop] = arg.split(':')
      }

      acc[className] = Boolean(this[prop]);
      return acc;
    }, {});
  }
}

export function byIndex(arg, index) {
  return function() {
    const isArray = Array.isArray(this[arg])
    console.assert(isArray, 'computed helper "byIndex" requires property of array type')
    return isArray ? this[arg][index] : undefined
  }
}