import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { cleanup, fireEvent, render } from 'react-testing-library'

import App from '../App'
import { UI } from '../utilities/enum'

afterEach(() => {
  cleanup()
})

const setup = () => {
  const {getByTestId, getByText, queryAllByPlaceholderText, queryAllByText} = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )

  return {getByTestId, getByText, queryAllByPlaceholderText, queryAllByText}
}

test('App defaults to Login', () => {
  const {queryAllByPlaceholderText, queryAllByText} = setup()

  expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByPlaceholderText(UI.USER.en)).toHaveLength(1)
  expect(queryAllByPlaceholderText(UI.PASSWORD.en)).toHaveLength(1)
  expect(queryAllByText(UI.LOGIN.en)).toHaveLength(1)
})

test('Login button directs to Home', () => {
  const {getByTestId, queryAllByPlaceholderText, queryAllByText} = setup()

  fireEvent.click(getByTestId('login-button'))

  expect(queryAllByPlaceholderText(UI.USER.en)).toHaveLength(0)
  expect(queryAllByPlaceholderText(UI.PASSWORD.en)).toHaveLength(0)
  expect(queryAllByText(UI.LOGIN.en)).toHaveLength(0)
  expect(queryAllByText(UI.LOGOUT.en)).toHaveLength(1)
})

test('Logout button directs to Login', () => {
  const {getByTestId, getByText, queryAllByPlaceholderText, queryAllByText} = setup()

  fireEvent.click(getByTestId('login-button'))
  fireEvent.click(getByText(UI.LOGOUT.en))

  expect(queryAllByPlaceholderText(UI.USER.en)).toHaveLength(1)
  expect(queryAllByPlaceholderText(UI.PASSWORD.en)).toHaveLength(1)
  expect(queryAllByText(UI.LOGIN.en)).toHaveLength(1)
  expect(queryAllByText(UI.LOGOUT.en)).toHaveLength(0)
})
