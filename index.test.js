const index = require('./index')

describe('sayHello', () => {
  test('greets by name', () => {
    expect(index.sayHello('Chelsea')).toEqual('Hello Chelsea!')
    expect(index.sayHello('Lani')).toEqual('Hello Lani!')
  })
})
