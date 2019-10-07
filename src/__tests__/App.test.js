import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import { cleanup, fireEvent, render, waitForElement } from '@testing-library/react'

import App from '../App'
import { UI } from '../utilities/enum'
import { ContextProvider } from '../context/ContextProvider'

afterEach(() => {
  cleanup()
})

const setup = (props) => {
  const { getByTestId, getByText, queryAllByPlaceholderText, queryAllByText, getByPlaceholderText, findAllByText } = render(
    <MemoryRouter>
      <ContextProvider>
        <App {...props} />
      </ContextProvider>
    </MemoryRouter>
  )
  return { App, getByTestId, getByText, queryAllByPlaceholderText, queryAllByText, getByPlaceholderText, findAllByText }
}

describe('Test App routing logic', () =>
{

  test('App defaults to Login', () => {
    const { queryAllByPlaceholderText, queryAllByText } = setup()

    expect(queryAllByText('SSB Logo')).toHaveLength(1)
    expect(queryAllByPlaceholderText(UI.USER.nb)).toHaveLength(1)
    expect(queryAllByText(UI.LOGIN.nb)).toHaveLength(1)
    expect(queryAllByText(UI.GENERIC_ERROR.nb)).toHaveLength(0)
  })

  test('Spinner is displayed while preferences are fetched', async () => {
    const { getByTestId, getByPlaceholderText } = setup()
    fireEvent.change(getByPlaceholderText(UI.USER.nb), { target: {value: 'noprefs' } })
    fireEvent.click(getByTestId('login-button'))
    await expect(getByTestId('userprefs-spinner')).toBeVisible()
  })

  test('Login button for new user directs to Preferences', async () => {
    const { getByText, getByTestId, queryAllByText, getByPlaceholderText } = setup()

    // Set user name and log in
    await fireEvent.change(getByPlaceholderText(UI.USER.nb), { target: {value: 'noprefs' } })
    fireEvent.click(getByTestId('login-button'))

    //Wait for preferences to be loaded
    await waitForElement(() => getByText('SSB Logo'))

    await expect(queryAllByText('SSB Logo')).toHaveLength(1)
    expect(queryAllByText(UI.ROLE.nb)).toHaveLength(2)
    expect(queryAllByText(UI.DATA_RESOURCE.nb)).toHaveLength(2)
    expect(queryAllByText(UI.GENERIC_ERROR.nb)).toHaveLength(0)
  })

  test('Login button for existing user directs to Home', async() => {
    const { getByText, getByTestId, queryAllByText, queryAllByPlaceholderText, getByPlaceholderText } = setup()

    // Set user name and log in
    fireEvent.change(getByPlaceholderText(UI.USER.nb), { target: {value: 'admin' } })
    fireEvent.click(getByTestId('login-button'))

    //Wait for preferences to be loaded
    await waitForElement(() => getByText(UI.LOGOUT.nb))

    // Wait for preferences to be resolved
    await expect(queryAllByText('SSB Logo')).toHaveLength(2)
    expect(queryAllByPlaceholderText(UI.USER.nb)).toHaveLength(0)
    expect(queryAllByText(UI.LOGIN.nb)).toHaveLength(0)
    expect(queryAllByText(UI.LOGOUT.nb)).toHaveLength(1)
  })

  test('Save Preferences button directs to Home', async () => {
    const { getByTestId, queryAllByPlaceholderText, queryAllByText, getByPlaceholderText, getByText } = setup()

    // Set username and log in
    fireEvent.change(getByPlaceholderText(UI.USER.nb), { target: { value: 'noprefs' } })
    fireEvent.click(getByTestId('login-button'))

    // Wait for preferences to be resolved
    await waitForElement(() => getByText('SSB Logo'))
    await expect(queryAllByText('SSB Logo')).toHaveLength(1)

    // Wait for dropdowns to be populated. NOTE: characterData must be set to true (false by default)
    // for waitForElement to subscribe
    await waitForElement(() => getByText('Statistikkprodusent'))

    await waitForElement(() => getByText('Strukturstatistikk'))

    // Set preferences and save
    fireEvent.click(getByText('Statistikkprodusent'))
    fireEvent.click(getByText('Strukturstatistikk'))
    fireEvent.click(getByText('Norsk'))
    fireEvent.click(getByText('LDS-C'))
    fireEvent.click(getByTestId('save-button'))

    await expect(queryAllByText('SSB Logo')).toHaveLength(1)
    expect(queryAllByPlaceholderText(UI.USER.nb)).toHaveLength(0)
    expect(queryAllByText(UI.LOGIN.nb)).toHaveLength(0)
    expect(queryAllByText(UI.SAVE.nb)).toHaveLength(0)
    expect(queryAllByText(UI.LOGOUT.nb)).toHaveLength(1)
  })

  test('Logout button directs to Login', async () => {
    const { getByTestId, getByText, queryAllByPlaceholderText, queryAllByText, getByPlaceholderText, findAllByText } = setup()

    // Set user name and log in
    fireEvent.change(getByPlaceholderText(UI.USER.nb), { target: {value: 'admin' } })
    fireEvent.click(getByTestId('login-button'))

    // Wait for preferences to be resolved (need two awaits for some reason)
    await findAllByText('Skattestatistikk person')
    await expect(queryAllByText('SSB Logo')).toHaveLength(2)
    // Wait for statustable to be resolved
    await findAllByText('Skattestatistikk person')

    fireEvent.click(getByText(UI.LOGOUT.nb))
    await expect(queryAllByPlaceholderText(UI.USER.nb)).toHaveLength(1)
    expect(queryAllByText(UI.LOGIN.nb)).toHaveLength(1)
    expect(queryAllByText(UI.LOGOUT.nb)).toHaveLength(0)
  })
})