import React from 'react'
import { cleanup, render } from 'react-testing-library'
import { UI } from '../utilities/enum/UI'
import LdsServiceMock from '../services/LdsServiceMock'
import UserPreferences from '../pages/userconfig/UserPreferences'

afterEach(() => {
  cleanup()
})

const setup = () => {
  const props = {
    dataResource: [],
    loggedIn: false,
    role: '',
  }
  const { queryAllByText } = render(<UserPreferences {...props} />)

  return { queryAllByText }
}

test('Login renders correctly', () => {
  const spyGetRoles = jest.spyOn(LdsServiceMock, 'getRoles')

  const { queryAllByText } = setup()

  expect(spyGetRoles).toHaveBeenCalled()
  expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByText(UI.ROLE.nb)).toHaveLength(2)
  expect(queryAllByText(UI.DATA_RESOURCE.nb)).toHaveLength(2)

  expect(queryAllByText(UI.SAVE.nb)).toHaveLength(1)
})
