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
  const props = {languageCode: 'en'}
  const {queryAllByPlaceholderText, queryAllByText} = render(<Login {...props} />)

  return {queryAllByPlaceholderText, queryAllByText}
}

test('Login renders correctly', () => {
  getData.mockImplementation(() => Promise.resolve(Roles))

  const {queryAllByPlaceholderText, queryAllByText} = setup()

  expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByPlaceholderText(UI.USER.en)).toHaveLength(1)
  expect(queryAllByPlaceholderText(UI.PASSWORD.en)).toHaveLength(1)
  expect(queryAllByText(UI.ROLE.en)).toHaveLength(2)
  expect(queryAllByText(UI.DATA_RESOURCE.en)).toHaveLength(2)
  expect(queryAllByText(UI.LOGIN.en)).toHaveLength(1)
})
