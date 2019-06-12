// This test file is for cases where we need to mock an error response
// from BackendService. We have not found a way to have both mock and actual implementation
// of the same component in the same file.

import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { cleanup, fireEvent, render, waitForElement } from '@testing-library/react'

import App from '../App'
import { UI } from '../utilities/enum'
import { ContextProvider } from '../context/ContextProvider'

afterEach(() => {
  cleanup()
})

beforeEach(() => {
  jest.resetModules();
})

const setup = () => {
  const { getByTestId, getByText, queryAllByPlaceholderText, queryAllByText, getByPlaceholderText } = render(
    <MemoryRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </MemoryRouter>
  )
  return { getByTestId, getByText, queryAllByPlaceholderText, queryAllByText, getByPlaceholderText }
}

jest.mock('../services/BackendServiceMock', () => {
  return jest.fn().mockImplementation(() => {
    return {
      searchUserPreferences: () => Promise.reject()
    }
  })
})

describe('Test when backend service returns an error', () => {
  test('Login error displays error message', async () => {
    const { getByTestId, getByText, getByPlaceholderText } = setup()

    // Set user name and try to log in
    fireEvent.change(getByPlaceholderText(UI.USER.nb), { target: { value: 'admin' } })
    fireEvent.click(getByTestId('login-button'))

    const errorElement = await waitForElement(() => getByText(UI.GENERIC_ERROR.nb))
    await expect(errorElement).toBeDefined()
  })
})
