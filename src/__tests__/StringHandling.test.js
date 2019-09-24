import { cleanup } from "@testing-library/react"
import { lowerCaseFirst, stringFormat } from "../utilities/common/StringHandling"

afterEach(() => {
  cleanup()
})

describe('Test StringHandling functions', () =>
{
  test('Test StringHandling.stringFormat with parameters', () => {
    let template = '{0}{1}{2}'
    let expected = '123'
    expect(expected).toBe(stringFormat(template, '1','2','3'))

    template = 'This is a more {2} string with {0} placement of {1}'
    expected = 'This is a more complicated string with random placement of arguments'
    expect(expected).toBe(stringFormat(template, 'random', 'arguments', 'complicated'))
    expect(expected).not.toBe(stringFormat(template, 'arguments', 'complicated', 'random'))
  })

  test('Test StringHandling.stringFormat without parameters or placeholders', () => {
    let template = '{0}{1}{2}'
    expect(template).toBe(stringFormat(template))

    template = 'A string without placeholders'
    expect(template).toBe(stringFormat(template))
    expect(template).toBe(stringFormat(template, 'param1', 'param2', 'param3'))
  })

  test('Test StringHandling.lowerCaseFirst', () => {
    let initial = 'CapitalC'
    let expected = 'capitalC'
    expect(expected).toBe(lowerCaseFirst(initial))

    initial = 'lowerC'
    expected = 'lowerC'
    expect(expected).toBe(lowerCaseFirst(initial))
  })
})
