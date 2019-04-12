import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { cleanup, render } from 'react-testing-library'

import Home from '../pages/home/Home'
import { UI } from '../utilities/enum'

afterEach(() => {
  cleanup()
})

const setup = () => {
  const props = {languageCode: 'en'}
  const {queryAllByRole, queryAllByTestId, queryAllByText} = render(
    <MemoryRouter>
        <Home {...props} />
      </MemoryRouter>
  )

  return {queryAllByRole, queryAllByTestId, queryAllByText}
}

test('Home renders correctly', () => {
  const {queryAllByRole, queryAllByTestId, queryAllByText} = setup()

  expect(queryAllByText('SSB Logo')).toHaveLength(1)
  expect(queryAllByTestId('global-search')).toHaveLength(1)
  expect(queryAllByText(`${UI.LANGUAGE.nb} (${UI.LANGUAGE_CHOICE.nb})`)).toHaveLength(1)
  expect(queryAllByRole('option')).toHaveLength(2)
  expect(queryAllByText(UI.LOGOUT.nb)).toHaveLength(1)
})
