import React from 'react'
import { cleanup, render } from 'react-testing-library'

import Login from '../pages/login/Login'
import { UI } from '../utilities/enum/UI'

afterEach(() => {
  cleanup()
})

const setup = () => {
  const props = {languageCode: 'en'}
  const {queryAllByPlaceholderText, queryAllByText} = render(<Login {...props} />)

  return {queryAllByPlaceholderText, queryAllByText}
}

test('Login renders correctly', () => {
  const {queryAllByPlaceholderText, queryAllByText} = setup()

  expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByPlaceholderText(UI.USER.en)).toHaveLength(1)
  expect(queryAllByPlaceholderText(UI.PASSWORD.en)).toHaveLength(1)
  expect(queryAllByText(UI.LOGIN.en)).toHaveLength(1)
})
