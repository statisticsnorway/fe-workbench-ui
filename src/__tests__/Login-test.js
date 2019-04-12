import React from 'react'
import { cleanup, render } from 'react-testing-library'

import Login from '../pages/login/Login'
import { getData } from '../utilities/fetch/Fetch'
import { UI } from '../utilities/enum/UI'

import Roles from './test-data/Roles'

jest.mock('../utilities/fetch/Fetch', () => ({getData: jest.fn()}))

afterEach(() => {
  cleanup()
})

const setup = () => {
  const props = {
    dataResource: [],
    loggedIn: false,
    role: '',
    user: ''
  }
  const {queryAllByPlaceholderText, queryAllByText} = render(<Login {...props} />)

  return {queryAllByPlaceholderText, queryAllByText}
}

test('Login renders correctly', () => {
  getData.mockImplementation(() => Promise.resolve(Roles))

  const {queryAllByPlaceholderText, queryAllByText} = setup()

  expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByPlaceholderText(UI.USER.nb)).toHaveLength(1)
  expect(queryAllByText(UI.ROLE.nb)).toHaveLength(2)
  expect(queryAllByText(UI.DATA_RESOURCE.nb)).toHaveLength(2)
  expect(queryAllByText(UI.LOGIN.nb)).toHaveLength(1)
})
