import React from 'react'
import { cleanup, render } from '@testing-library/react'

import Login from '../pages/login/Login'
import { UI } from '../utilities/enum/UI'


afterEach(() => {
  cleanup()
})

const setup = () => {
  const props = {
    loggedIn: false,
    user: ''
  }
  const { queryAllByPlaceholderText, queryAllByText } = render(<Login {...props} />)

  return { queryAllByPlaceholderText, queryAllByText }
}

test('Login renders correctly', () => {
  const { queryAllByPlaceholderText, queryAllByText } = setup()

  expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByPlaceholderText(UI.USER.nb)).toHaveLength(1)
  expect(queryAllByText(UI.LOGIN.nb)).toHaveLength(1)
  expect(queryAllByText(UI.GENERIC_ERROR.nb)).toHaveLength(0)
})

test('Error renders error field', () => {
  const props = {
    loggedIn: false,
    user: 'admin',
    error: true
  }
  const { queryAllByPlaceholderText, queryAllByText } = render(<Login {...props} />)

  expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByPlaceholderText(UI.USER.nb)).toHaveLength(1)
  expect(queryAllByText(UI.LOGIN.nb)).toHaveLength(1)
  expect(queryAllByText(UI.GENERIC_ERROR.nb)).toHaveLength(1)
})
