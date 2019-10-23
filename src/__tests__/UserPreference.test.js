import React from 'react'
import { cleanup, fireEvent, render, waitForElement } from '@testing-library/react'
import { UI } from '../utilities/enum/UI'
import LdsServiceMock from '../services/LdsServiceMock'
import UserPreferences from '../pages/userconfig/UserPreferences'
import { ContextProvider } from '../context/ContextProvider'
import Preferences from './test-data/Preferences'
import { LDS_INSTANCES } from "../utilities/enum/LDS_INSTANCES"

afterEach(() => {
  cleanup()
})

const setup = () => {
  const props = {
    statisticalProgram: [],
    loggedIn: false,
    role: '',
    error: false,
    user: {
      username: 'admin',
      userPrefs: Preferences.admin.preferences
    },
    handleUpdate: () => Promise.reject()
  }
  const { queryAllByText, getByText, getByTestId } = render(
    <ContextProvider user={props.user}>
      <UserPreferences fullscreen={true} {...props} />
    </ContextProvider>)

  return { queryAllByText, getByText, getByTestId }
}

test('UserPreferences renders correctly', () => {
  const spyGetRoles = jest.spyOn(LdsServiceMock.prototype, 'getRoles')
  const spyGetStatisticalPrograms = jest.spyOn(LdsServiceMock.prototype, 'getStatisticalPrograms')

  const { queryAllByText } = setup()

  expect(spyGetRoles).toHaveBeenCalled()
  expect(spyGetStatisticalPrograms).toHaveBeenCalled()
  expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByText(UI.ROLE.nb)).toHaveLength(2)
  expect(queryAllByText(UI.STATISTICAL_PROGRAM.nb)).toHaveLength(2)

  expect(queryAllByText(UI.SAVE.nb)).toHaveLength(1)
  expect(queryAllByText(UI.GENERIC_ERROR.nb)).toHaveLength(0)
})

test('Error renders error field', async() => {
  const { queryAllByText, getByText, getByTestId } = setup()

  await waitForElement(() => getByText('Statistikkprodusent'))

  await waitForElement(() => getByText('Test without dependency bp'))

  // Set preferences and save
  fireEvent.click(getByText('Statistikkprodusent'))
  fireEvent.click(getByText('Test statistical program'))
  fireEvent.click(getByText(UI.LANGUAGE_CHOICE.nb))
  fireEvent.click(getByText(LDS_INSTANCES.C.nb))
  fireEvent.click(getByTestId('save-button'))

  await expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByText(UI.SAVE.nb)).toHaveLength(1)

  const errorField = await waitForElement(() => getByText(UI.GENERIC_ERROR.nb))
  expect(errorField).toBeDefined()
})



