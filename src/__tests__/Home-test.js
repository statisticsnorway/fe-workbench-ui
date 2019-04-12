import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { cleanup, render } from 'react-testing-library'

import Home from '../pages/home/Home'
import { getData } from '../utilities/fetch/Fetch'
import { UI } from '../utilities/enum'

import Roles from './test-data/Roles'

jest.mock('../utilities/fetch/Fetch', () => ({getData: jest.fn()}))

afterEach(() => {
  cleanup()
})

const setup = () => {
  const props = {languageCode: 'en', user: 'test'}
  const {queryAllByRole, queryAllByTestId, queryAllByText} = render(
    <MemoryRouter>
      <Home {...props} />
    </MemoryRouter>
  )

  return {queryAllByRole, queryAllByTestId, queryAllByText}
}

test('Home renders correctly', () => {
  getData.mockImplementation(() => Promise.resolve(Roles[0]))

  const {queryAllByRole, queryAllByTestId, queryAllByText} = setup()

  expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByTestId('global-search')).toHaveLength(1)
  expect(queryAllByText(`${UI.LANGUAGE.nb} (${UI.LANGUAGE_CHOICE.nb})`)).toHaveLength(1)
  expect(queryAllByRole('option')).toHaveLength(2)
  expect(queryAllByText(UI.LOGOUT.nb)).toHaveLength(1)
  expect(queryAllByText(`${UI.LANGUAGE.en} (${UI.LANGUAGE_CHOICE.en})`)).toHaveLength(1)
  expect(queryAllByRole('option')).toHaveLength(4)
  expect(queryAllByText(UI.LOGOUT.en)).toHaveLength(1)
})
