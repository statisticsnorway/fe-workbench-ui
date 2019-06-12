import React from 'react'
import { cleanup, render } from '@testing-library/react'

import Status from '../pages/home/status/Status'
import { lowerCaseFirst } from '../utilities/common/StringHandling'
import { UI } from '../utilities/enum'

import { mockStatusType } from '../mocks/MockStatusType'
import { ContextProvider } from '../context/ContextProvider'

afterEach(() => {
  cleanup()
})

// Setup with role that has access to both collection and statisticalProduction
const setup = () => {
  const props = {
    user: {
      userPrefs:{
        preferences: {
          dataResource: ['personTaxStatistics'],
          role: 'ee9269d9-ec25-4d7d-9148-6d5c28353b24',
          user: 'test'
        }
      }
    }
  }
  const { queryAllByText } = render(
    <ContextProvider>
      <Status {...props} />
    </ContextProvider>)

  return { queryAllByText }
}

test('Status renders correctly', () => {
  const { queryAllByText } = setup()

  expect(queryAllByText(`${mockStatusType.collection.name.nb} ${lowerCaseFirst(UI.STATUS.nb)}`))
    .toHaveLength(1)
  expect(queryAllByText(`${mockStatusType.statisticalProduction.name.nb} ${lowerCaseFirst(UI.STATUS.nb)}`))
    .toHaveLength(1)
})
