import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import { cleanup, fireEvent, render, wait } from '@testing-library/react'

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
  const { getByTestId, queryAllByTestId, queryAllByText } = render(
    <MemoryRouter>
      <ContextProvider>
        <Home {...props} />
      </ContextProvider>
    </MemoryRouter>
  )

  return { getByTestId, queryAllByTestId, queryAllByText }
}

test('Home renders correctly', () => {
  const { queryAllByTestId, queryAllByText } = setup()

  expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByTestId('global-search')).toHaveLength(1)
  expect(queryAllByText(UI.LOGOUT.nb)).toHaveLength(1)
  expect(queryAllByText(UI.PREFERENCES.nb)).toHaveLength(1)
  expect(queryAllByText(`${UI.APP_VERSION.nb}: ${process.env.REACT_APP_VERSION}`)).toHaveLength(1)
})

test('Chevron shows/hides top menu', async() => {
  const { getByTestId } = setup()
  const topMenu = getByTestId('topMenu')
  expect(topMenu).toHaveClass('visible')

  fireEvent.click(getByTestId('topMenu-toggle'))
  await wait(() => { expect(topMenu).toHaveClass('hidden') })

  fireEvent.click(getByTestId('topMenu-toggle'))
  expect(topMenu).toHaveClass('visible')

})

test('Left menu shows/hides correctly', async() => {
  const { getByTestId } = setup()

  const leftMenu = getByTestId('leftMenu')
  expect(leftMenu).toHaveClass('visible')

  fireEvent.click(getByTestId('leftMenu-hide'))
  expect(leftMenu).not.toHaveClass('visible')

  fireEvent.click(getByTestId('leftMenu-show'))
  expect(leftMenu).toHaveClass('visible')

})
