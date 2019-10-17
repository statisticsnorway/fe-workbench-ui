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
      <ContextProvider user={props.user}>
        <Home {...props} />
      </ContextProvider>
    </MemoryRouter>
  )

  return { getByTestId, queryAllByTestId, queryAllByText }
}

test('Home renders correctly', () => {
  const { queryAllByTestId, queryAllByText } = setup()

  expect(queryAllByText('SSB Logo')).toHaveLength(2)
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

test('Left menu is hidden and burger button displayed when page renders', async() => {
  const { queryAllByTestId, getByTestId } = setup()

  expect(queryAllByTestId('leftMenu')).toHaveLength(0)
  expect(getByTestId('leftMenu-show')).toBeVisible()

  // TODO get the below to work. As it is, burger button is still visible and left menu still hidden after fireEvent.mouseEnter
  // fireEvent.mouseEnter(getByTestId('leftMenu-show'))
  // await waitForElement(() => getByTestId('leftMenu'))

})
