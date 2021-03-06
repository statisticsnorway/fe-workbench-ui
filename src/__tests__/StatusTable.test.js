import React from 'react'
import { cleanup, render } from '@testing-library/react'

import StatusTable from '../pages/home/status/StatusTable'
import { STATUS_TABLE } from '../utilities/enum'
import { ContextProvider } from '../context/ContextProvider'

afterEach(() => {
  cleanup()
})

const setup = () => {
  const props = {
    statusType: 'collection',
    user: {
      userPrefs:{
        preferences:{
          statisticalProgram: ['personTaxStatistics'],
          role: 'ee9269d9-ec25-4d7d-9148-6d5c28353b24',
          user: 'test'
        }
      }
    }
  }
  const { queryAllByText } = render(
    <ContextProvider {...props} >
      <StatusTable statusType={props.statusType}/>
    </ContextProvider>)

  return { queryAllByText }
}

test('StatusTable renders correctly', () => {
  const { queryAllByText } = setup()

  Object.keys(STATUS_TABLE).forEach(column => {
    expect(queryAllByText(STATUS_TABLE[column].text.nb)).toHaveLength(1)
  })
})
