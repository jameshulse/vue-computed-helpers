import * as computed from '../lib/index'

global.console.assert = jest.fn()

describe('byIndex', () => {
  const context = {
    todos: [{
      id: 1,
      done: false
    }, {
      id: 2,
      done: true
    }, {
      id: 3,
      done: true
    }],
    arr: [1, 2, 3, 4],
    items: 'test'
  }

  it('finds an item in array by index', () => {
    expect(
      computed.byIndex('todos', 2).bind(context)()
    ).toEqual({ id: 3, done: true })

    expect(
      computed.byIndex('arr', 0).bind(context)()
    ).toEqual(1)
  })

  it('returns an undefined value when the argument is not an array', () => {
    expect(
      computed.byIndex('items', 0).bind(context)()
    ).toEqual(undefined)
    expect(console.assert.mock.calls.slice(-1)[0][0]).toBe(false)
  })
})
