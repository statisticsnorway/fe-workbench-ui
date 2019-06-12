import React from 'react'
import 'jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'

import Home from '../pages/home/Home'
import { UI } from '../utilities/enum'
import { ContextProvider } from '../context/ContextProvider'

afterEach(() => {
  cleanup()
})

const setup = () => {
  const props = {
    dataResource: ['personTaxStatistics'],
    role: 'ee9269d9-ec25-4d7d-9148-6d5c28353b24',
    user: 'test'
  }
  const { getByTestId, getByText, queryAllByTestId, queryAllByText } = render(
    <MemoryRouter>
      <ContextProvider>
        <Home {...props} />
      </ContextProvider>
    </MemoryRouter>
  )

  return { getByTestId, getByText, queryAllByTestId, queryAllByText }
}

test('Home renders correctly', () => {
  const { queryAllByTestId, queryAllByText } = setup()

  expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByTestId('global-search')).toHaveLength(1)
  expect(queryAllByText(`${UI.LANGUAGE.nb} (${UI.LANGUAGE_CHOICE.nb})`)).toHaveLength(1)
  expect(queryAllByText(UI.LOGOUT.nb)).toHaveLength(1)
})

test('Chevron shows/hides top menu', () => {
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

test('Left menu shows/hides correctly', () => {
  const { getByTestId } = setup()

  expect(getByTestId('leftMenu')).toBeVisible()
  expect(getByTestId('leftMenu-hide')).toBeVisible()

  fireEvent.click(getByTestId('leftMenu-hide'))

  setTimeout(() => {
    expect(getByTestId('leftMenu')).not.toBeVisible()
    expect(getByTestId('leftMenu-hide')).not.toBeVisible()
    expect(getByTestId('leftMenu-show')).toBeVisible()
  }, 200)

  fireEvent.click(getByTestId('leftMenu-show'))

  setTimeout(() => {
    expect(getByTestId('leftMenu')).toBeVisible()
    expect(getByTestId('leftMenu-hide')).toBeVisible()
  }, 200)
})
