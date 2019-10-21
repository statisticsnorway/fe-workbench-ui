import React, { Component } from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ContextProvider, WorkbenchContext } from '../../context/ContextProvider'

// A dummy test component that will access the WorkbenchContext
class Test extends Component {
  static contextType = WorkbenchContext
  render () {
    let context = this.context
    return (
      <div onClick={() => context.setLanguage('en')} data-testid='testId'>
        {context.getLocalizedGsimObjectText(this.props.value)}
      </div>
    )
  }
}

const gsimObject = [
  {
    languageCode: 'no',
    languageText: 'test-no'
  },
  {
    languageCode: 'en',
    languageText: 'test-en'
  }
]

afterEach(() => {
  cleanup()
})

const includeProvider = (value) => {
  const { getByTestId } = render(
    <ContextProvider>
      <Test value={value}/>
    </ContextProvider>)
  return { getByTestId }
}

const excludeProvider = () => {
  const { getByTestId } = render(<Test value={gsimObject}/>)
  return { getByTestId }
}


test('Gsim object text renders correctly', () => {
  const { getByTestId } = includeProvider(gsimObject)
  expect(getByTestId('testId')).toHaveTextContent('test-no')
  fireEvent.click(getByTestId('testId'))
  expect(getByTestId('testId')).toHaveTextContent('test-en')
})

test('Accessing context outside of WorkbenchContext should throw error', () => {
  expect(() => excludeProvider()).toThrowError()
})

test('Returns null when empty object', () => {
  const { getByTestId } = includeProvider([])
  expect(getByTestId('testId')).toHaveTextContent('')
})

test('Returns null when undefined object', () => {
  const { getByTestId } = includeProvider(undefined)
  expect(getByTestId('testId')).toHaveTextContent('')
})
