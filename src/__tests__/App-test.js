import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { cleanup, fireEvent, render } from 'react-testing-library'

import App from '../App'
import { UI } from '../utilities/enum'

afterEach(() => {
  cleanup()
})

const properties = {
  ldsURL: "http://localhost:9090/"
}

const setup = () => {
  const {getByTestId, getByText, queryAllByPlaceholderText, queryAllByText} = render(
    <MemoryRouter>
      <App {...properties} />
    </MemoryRouter>
  )

  return {getByTestId, getByText, queryAllByPlaceholderText, queryAllByText}
}

test('App defaults to Login', () => {
  const {queryAllByPlaceholderText, queryAllByText} = setup()

  expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByPlaceholderText(UI.USER.nb)).toHaveLength(1)
  expect(queryAllByText(UI.LOGIN.nb)).toHaveLength(1)
})

test('Login button directs to Home', () => {
  const {getByTestId, queryAllByPlaceholderText, queryAllByText} = setup()

  fireEvent.click(getByTestId('login-button'))

  expect(queryAllByPlaceholderText(UI.USER.nb)).toHaveLength(0)
  expect(queryAllByText(UI.LOGIN.nb)).toHaveLength(0)
  expect(queryAllByText(UI.LOGOUT.nb)).toHaveLength(1)
})

test('Logout button directs to Login', () => {
  const {getByTestId, getByText, queryAllByPlaceholderText, queryAllByText} = setup()

  fireEvent.click(getByTestId('login-button'))
  fireEvent.click(getByText(UI.LOGOUT.nb))

  expect(queryAllByPlaceholderText(UI.USER.nb)).toHaveLength(1)
  expect(queryAllByText(UI.LOGIN.nb)).toHaveLength(1)
  expect(queryAllByText(UI.LOGOUT.nb)).toHaveLength(0)
})
