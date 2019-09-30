import { cleanup, render, waitForElement } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { ContextProvider } from '../../context/ContextProvider'
import React from 'react'
import LdsServiceMock from '../../services/LdsServiceMock'
import Variable from '../../pages/variable/Variable'

afterEach(() => {
  cleanup()
})

const setup = () => {
  const props = {
    match: {
      params: {
        id: 'dummy-id'
      }
    }
  }
  const { findByText } = render(
    <MemoryRouter>
      <ContextProvider>
        <Variable {...props}/>
      </ContextProvider>
    </MemoryRouter>)

  return { findByText }
}

test('Variable is rendered correctly', async() => {
  const spyGetVariable = jest.spyOn(LdsServiceMock.prototype, 'getVariable')
  const { findByText } = setup()

  expect(spyGetVariable).toHaveBeenCalled()
  expect(findByText('Gender')).toBeDefined()
  expect(findByText('Population')).toBeDefined()
})
