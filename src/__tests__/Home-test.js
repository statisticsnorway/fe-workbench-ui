import React from 'react'
import 'jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import { cleanup, fireEvent, render } from 'react-testing-library'

import Home from '../pages/home/Home'
import { getData } from '../utilities/fetch/Fetch'
import { UI } from '../utilities/enum'

import Roles from './test-data/Roles'

jest.mock('../utilities/fetch/Fetch', () => ({getData: jest.fn()}))

afterEach(() => {
  getData.mockReset()
  cleanup()
})

const setup = () => {
  const props = {user: 'test'}
  const {getByTestId, getByText, queryAllByRole, queryAllByTestId, queryAllByText} = render(
    <MemoryRouter>
      <Home {...props} />
    </MemoryRouter>
  )

  return {getByTestId, getByText, queryAllByRole, queryAllByTestId, queryAllByText}
}

test('Home renders correctly', () => {
  getData.mockImplementation(() => Promise.resolve(Roles[0]))

  const {queryAllByRole, queryAllByTestId, queryAllByText} = setup()

  expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByTestId('global-search')).toHaveLength(1)
  expect(queryAllByText(`${UI.LANGUAGE.nb} (${UI.LANGUAGE_CHOICE.nb})`)).toHaveLength(1)
  expect(queryAllByRole('option')).toHaveLength(4)
  expect(queryAllByText(UI.LOGOUT.nb)).toHaveLength(1)
})

test('Chevron shows/hides top menu', () => {
  getData.mockImplementation(() => Promise.resolve(Roles[0]))

  const { getByTestId, getByText } = setup()

  fireEvent.click(getByTestId('topMenu-toggle'))

  setTimeout(() => {
    expect(getByText('SSB Logo')).not.toBeVisible()
    expect(getByTestId('global-search')).not.toBeVisible()
    expect(getByText(`${UI.LANGUAGE.nb} (${UI.LANGUAGE_CHOICE.nb})`)).not.toBeVisible()
    expect(getByText(UI.LOGOUT.nb)).not.toBeVisible()
  }, 200)

  fireEvent.click(getByTestId('topMenu-toggle'))

  setTimeout(() => {
    expect(getByText('SSB Logo')).toBeVisible()
    expect(getByTestId('global-search')).toBeVisible()
    expect(getByText(`${UI.LANGUAGE.nb} (${UI.LANGUAGE_CHOICE.nb})`)).toBeVisible()
    expect(getByText(UI.LOGOUT.nb)).toBeVisible()
  }, 200)
})
