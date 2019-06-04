import React from 'react'
import { cleanup, fireEvent, render, waitForElement } from '@testing-library/react'
import { UI } from '../utilities/enum/UI'
import LdsServiceMock from '../services/LdsServiceMock'
import UserPreferences from '../pages/userconfig/UserPreferences'
import { ContextProvider } from '../context/ContextProvider'

afterEach(() => {
  cleanup()
})

const setup = () => {
  const props = {
    dataResource: [],
    loggedIn: false,
    role: '',
    error: false,
    handleUpdate: () => Promise.reject()
  }
  const { queryAllByText, getByText, getByTestId } = render(
    <ContextProvider>
      <UserPreferences {...props} />
    </ContextProvider>)

  return { queryAllByText, getByText, getByTestId }
}

test('UserPreferences renders correctly', () => {
  const spyGetRoles = jest.spyOn(LdsServiceMock.prototype, 'getRoles')
  const spyGetDataResources = jest.spyOn(LdsServiceMock.prototype, 'getDataResources')

  const { queryAllByText } = setup()

  expect(spyGetRoles).toHaveBeenCalled()
  expect(spyGetDataResources).toHaveBeenCalled()
  expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByText(UI.ROLE.nb)).toHaveLength(2)
  expect(queryAllByText(UI.DATA_RESOURCE.nb)).toHaveLength(2)

  expect(queryAllByText(UI.SAVE.nb)).toHaveLength(1)
  expect(queryAllByText(UI.GENERIC_ERROR.nb)).toHaveLength(0)
})

test('Error renders error field', async() => {
  const { queryAllByText, getByText, getByTestId } = setup()

  await waitForElement(() => getByText('Statistikkprodusent'))

  await waitForElement(() => getByText('Strukturstatistikk'))

  // set preferences and save
  fireEvent.click(getByText('Statistikkprodusent'))
  fireEvent.click(getByText('Strukturstatistikk'))
  fireEvent.click(getByText('Norsk'))
  fireEvent.click(getByTestId('save-button'))

  await expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByText(UI.SAVE.nb)).toHaveLength(1)

  const errorField = await waitForElement(() => getByText(UI.GENERIC_ERROR.nb))
  expect(errorField).toBeDefined()
})



